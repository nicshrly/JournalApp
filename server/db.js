import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToMongoDB(){
  await client.connect();
  db = client.db('Journal');
  console.log('Successfully connected to MongoDB');
  return db;
}

export function getDB(){
  if(!db){
    throw new Error('Database has not been connected yet');
  }
  return db;
}

export async function disconnectFromMongoDB(){
  await client.close();
} 