import './DeleteModal.css'

const DeleteModal = ({ message, onConfirm, onCancel }) => {

  return (
    <div className='modal-container'>
      <div className='modal'>
        <p>{message}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteModal;