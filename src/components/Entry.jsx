import './Entry.css'

const Entry = ({ data, onDelete }) => {

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

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      <p>{data.mood}</p>
      <p className='entry-body'>{data.body}</p>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
};

export default Entry