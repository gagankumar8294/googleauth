// config/mongo.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://gagankumar8294:gagankumar8294@cluster0.tp0sfgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('googleauth'); // change this to your desired DB name
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

function getDB() {
  return db;
}

export { connectToMongo, getDB };
