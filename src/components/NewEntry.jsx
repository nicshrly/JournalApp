import { useState } from 'react';
import './NewEntry.css';

const NewEntry = () => {
  const date = new Date().toDateString();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('');

  const moods = ['No Mood', 'Happy', 'Calm', 'Tired', 'Anxious', 'Sad', 'Mad']

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const res = await fetch('http://localhost:5000/entries', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, mood, date})
      });

      if(!res.ok){
        throw new Error('Request failed: ', res.status);
      }

      const saved = await res.json();
      console.log('Saved:', saved);

      setTitle('');
      setBody('');
      setMood('No Mood');
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

      <button className='submit'>Save</button>
    </form>
  )
};

export default NewEntry;