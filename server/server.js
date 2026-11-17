import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToMongoDB, disconnectFromMongoDB } from './db.js';
import routes from './routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/entries', routes);

async function startServer() {
  try{
    await connectToMongoDB();

    app.listen(5000, () => {
      console.log("Backend listening on port 5000");
    });
  }
  catch(error){
    console.error('Failed to start server: ', error);
    process.exit(1);
  }
}

startServer();