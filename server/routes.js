import express from 'express';
import { getDB } from './db.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try{
    const db = getDB();
    const entries = await db.collection("entries").find().toArray();
    res.json(entries);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: "Could not retrieve journal entries"});
  }
})

router.post("/", async (req, res) => {
  try{
    const db = getDB();
    const { title, date, mood, body } = req.body;

    const newEntry = {
      title: title.trim(),
      date: date,
      mood: mood,
      body: body.trim()
    };

    const result = await db.collection('entries').insertOne(newEntry);

    res.status(201).json({
      _id: result.insertedId,
      ...newEntry
    })
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Could not create new journal entry'})
  }
});

export default router;