import { MongoClient } from "mongodb";


const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connect database success")
} catch(e) {
  console.error(e);
}

let db = conn.db("SpeedGame");

export default db;