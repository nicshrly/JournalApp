import express from 'express';
import { getDB } from './db.js';
import { ObjectId } from 'mongodb';

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
      body: body
    };

    const result = await db.collection('entries').insertOne(newEntry);

    res.status(201).json({
      _id: result.insertedId,
      ...newEntry
    })
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Could not create new journal entry'});
  }
});

router.delete("/:id", async (req, res) => {
  try{
    const db = getDB();
    const { id } = req.params;

    if(!ObjectId.isValid(id)){
      return res.status(400).json({ error: 'Invalid Id' });
    }

    const result = await db.collection('entries').deleteOne({ _id: new ObjectId(id) });

    if(result.deletedCount === 0){
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.status(204).send();
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: 'Could not delete journal entry'});
  }
});

export default router;