import './Entry.css'
import DeleteModal from './DeleteModal';
import { moods } from './moods';
import { useState } from 'react';

const Entry = ({ data, onUpdate, onDelete }) => {

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const [mood, setMood] = useState(data.mood);
  const [editing, setEditing] = useState(false);

  const isBodyEmpty = body.trim() === '';

  const handleDelete = async() => {
    try{
      const res = await fetch(`http://localhost:5000/entries/${data._id}`, {
        method: 'DELETE'
      });

      if(!res.ok){
        throw new Error('Delete failed: ', res.status);
      }

      onDelete();
    }
    catch(err){
      console.error(err);
    }
  }

  const handleUpdate = async(e) => {
    e.preventDefault();

    try{
      const res = await fetch(`http://localhost:5000/entries/${data._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          mood,
          body
        })
      });

      if (!res.ok){
        throw new Error(`Edit failed: ${res.status}`);
      }

      const saved = await res.json();
      setEditing(false);
      onUpdate(saved);
    }
    catch(err){
      console.error(err);
    }
  };

  if (editing){
    return (
      <form className='entry-container' onSubmit={handleUpdate}>
        <input
          className='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Untitled'
        />

        <p className='date'>{data.date}</p>

        <select 
          className='mood'
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value=''>No Mood</option>
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

        <button className='update' disabled={isBodyEmpty}>Save</button>
        <button className='cancel' type='button' onClick={() => setEditing(false)}>Cancel</button>
      </form>
    );
  }

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      {data.mood && <p>{data.mood}</p>}
      <p className='entry-body'>{data.body}</p>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={() => setOpenModal(true)}>Delete</button>

      {openModal && (<DeleteModal
        message='Are you sure you want to delete this entry?'
        onConfirm={handleDelete}
        onCancel={() => setOpenModal(false)}
      ></DeleteModal>)}
    </>
  )
};

export default Entry