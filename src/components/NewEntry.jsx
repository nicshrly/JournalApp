import { useState } from 'react';
import './NewEntry.css';

const NewEntry = ({ onEntryAdded }) => {
  const date = new Date().toDateString();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('');

  const moods = ['No Mood', 'Happy', 'Calm', 'Tired', 'Anxious', 'Sad', 'Mad'];

  const isBodyEmpty = body.trim() === '';

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isBodyEmpty) return;

    try{
      const res = await fetch('http://localhost:5000/entries', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title || 'Untitled', 
          body, 
          mood, 
          date
        })
      });

      if(!res.ok){
        throw new Error('Request failed: ', res.status);
      }

      const saved = await res.json();
      console.log('Saved:', saved);

      // reset form
      setTitle('');
      setBody('');
      setMood('No Mood');

      onEntryAdded(saved);
    }
    catch(error){
      console.error(error);
    }
  };

  return (
    <form className='entry-container' onSubmit={handleSubmit}>
      <input
        className='title'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Untitled'
      />

      <p className='date'>{date}</p>

      <select 
        className='mood'
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      >
        {moods.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <textarea 
        className='body'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
      />

      <button className='submit' disabled={isBodyEmpty}>Save</button>
    </form>
  )
};

export default NewEntry;