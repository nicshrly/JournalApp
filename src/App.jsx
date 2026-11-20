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
        <ul className='entry-list'>
          {[...entries].reverse().map(e => (
            <li key={e._id}>
              <button
                onClick={() => {
                  setCreate(false);
                  setEntry(e);
                }}
              >
                {e.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='content'>
        {create ? 
          (<NewEntry 
            onEntryAdded={(saved) => {
              loadEntries();
              setEntry(saved);
              setCreate(false);
            }}
          ></NewEntry>) 
        : 
          (<Entry
            key={entry._id} 
            data={entry} 
            onDelete={() => {
              loadEntries();
              setEntry(undefined);
              setCreate(true);
            }}
            onUpdate={(saved) => {
              loadEntries();
              setEntry({ ...entry, ...saved });
            }}
          ></Entry>)
        }
      </div>
    </div>
  )
}

export default App
