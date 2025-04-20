import './ModalImage.css'

const ModalImage = ({ setModalImage, modalImage }) => {
  return (
    // <div className='modal-overlay' onClick={()=>setModalImage(false)}>
    <div className='modal-overlay' >
      <div className="modal-container">
        <button onClick={() => setModalImage(false)}>X</button>
        <div className='img-box'>
        <img src={modalImage.url} alt={modalImage.name} />
        </div>
        <h4><span>Name : </span>{modalImage.name} </h4>
        <p><span>Category : </span>{modalImage.category} </p>
        <p><span>Description : </span>{modalImage.description} </p>
        <p><span>History : </span>{modalImage.history} </p>
        <p><span>Location : </span>{modalImage.location} </p>
      </div>
    </div>
  );
};

export default ModalImage;
