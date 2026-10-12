import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중 핫 리로드 때마다 새 연결이 생기지 않도록 전역에 캐시
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. (.env.local)");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

type ClickDoc = { _id: string; count: number };

async function clicksCollection() {
  const client = await getClient();
  return client.db(dbName).collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string): Promise<number> {
  const clicks = await clicksCollection();
  const doc = await clicks.findOneAndUpdate(
    { _id: linkId },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return doc?.count ?? 1;
}

// DB에 연결할 수 없어도 페이지는 보여야 하므로 실패 시 빈 객체를 반환
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const clicks = await clicksCollection();
    const docs = await clicks.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (error) {
    console.error("클릭 수를 불러오지 못했습니다:", error);
    return {};
  }
}
