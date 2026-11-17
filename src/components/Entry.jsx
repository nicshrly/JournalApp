import './Entry.css'

const Entry = ({ data }) => {
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      <p>{data.mood}</p>
      <p>{data.body}</p>
      <button>Delete</button>
    </>
  )
};

export default Entry