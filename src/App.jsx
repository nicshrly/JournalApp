import './App.css'
import NewEntry from './components/NewEntry';
import Entry from './components/Entry'
import { useState, useEffect } from 'react';

function App() {

  const [entries, setEntries] = useState([]);
  const [create, setCreate] = useState(true);
  const [entry, setEntry] = useState();

  async function loadEntries(){
    try{
      const response = await fetch('http://localhost:5000/entries');

      if(!response.ok){
        throw new Error('Loading entries failed')
      }
      const data = await response.json();
      setEntries(data);
    }
    catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className='container'>
      <div className='header'>
        <h1>My Journal</h1>
      </div>
      <div className='sidebar'>
        <button className='create' onClick={() => setCreate(true)}>
          New
        </button>
        <li>
          {entries.map(e => (
            <button 
              key={e._id} 
              onClick={() => {
                setCreate(false);
                setEntry(e);
              }}
            >
              {e.title}
            </button>
          ))}
        </li>
      </div>
      <div className='content'>
        {create ? (<NewEntry></NewEntry>) : (<Entry data={entry}></Entry>)}
      </div>
    </div>
  )
}

export default App
