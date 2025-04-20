import { useEffect, useState } from "react";
import "./imagelist.css";
import { useNavigate } from "react-router";
import axios from "axios";
const ImageList = ({ selectedCategory, onImageClick }) => {
  const [images, setImages] = useState();
  const [filterImg,setFilterImg] = useState();
  const [loading, setLoading] = useState(true);
  const navigate =  useNavigate();
  const [editImage,setEditImage] = useState(null);
  const [editForm,setEditForm] = useState(null);

  // fetch images from server:
  // useEffect(() => {
  //   const fetchImage = async () => {
  //     setLoading(true);
  //     try{
  //       //fetch image data from server
  //       const response = await fetch("http://localhost:3000/api/image");
  //       const data = await response.json();
  //       setImages(data);
  //       filterImages(data);
  //     }
  //     catch(e){
  //       console.log('Error in fetching images..',e);
  //     }
  //     finally{
  //       setLoading(false);
  //     }

  //   };
  //   fetchImage();
  // }, []);
  const fetchImage = async () => {
    setLoading(true);
    try{
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error('Access Denied! you do not have any token');
      }
      //fetch image data from server
      const response = await axios.get('http://localhost:3000/api/image/get-protected-image', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // const response = await fetch("http://localhost:3000/api/protected/image");
      // const data = await response.json();
      const data = response.data;
      console.log(data.images)
      console.log(data.user)
      console.log(`${data.message} : ${data.user.username}`)
      setImages(data.images);
      filterImages(data.images);
    }
    catch(err){
      console.log(err.message);
      localStorage.removeItem('token');
      navigate('/account/login'); // Replace with the desired route after logout
    }
    finally{
      setLoading(false);
    }
  };
  // call fetch image function:
  useEffect(() => {
    fetchImage();
  }, []);

 // filter images basis on category:
  const filterImages = (images)=>{
    if(selectedCategory === "all"){
      setFilterImg(images)
    }
    else{
      const filteredImg = images.filter((img)=>img.category === selectedCategory)
      console.log(filteredImg)
      console.log(selectedCategory)
      setFilterImg(filteredImg)
    }
  }

  //catch changes in selectedCategory:
  useEffect(() => {
    if (images) {
      filterImages(images);
    }
  }, [selectedCategory]);

  // Handler for Delete Image:
  const handlerDeleteImage = ()=>{
   
  }
  // Handler for Edit Image:
  // Handler for Save  Image:
  
  // Handler for Update Image: 
  const handlerEditImage = (img)=>{
    setEditImage(img);
    setEditForm({
      ...img,
      name: Array.isArray(img.name) ? img.name[0] : img.name // Ensure it's a single string
    });
  }
  
  // Handler for Input Change:
  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }
  
  // Handler for Submit/Save:
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editForm);

      const response = await axios.put(`http://localhost:3000/api/image/update-image/${editImage._id}`, editForm);
      alert(response.data.message);
      setEditImage(null);
      fetchImage();
    }
    catch (e) {
      console.log(e);
    }
  }
  
  // loading spinner:
  if(loading){
    return(
      <div className="spinner-border text-primary" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    )
  }

  return (
    <div className="imageL-list-container">
      <ul>
        {filterImg &&
          filterImg.map((img) => (
            // editImage ?
            editImage ?._id === img._id?
            <li key={img.name} id="edit-image">
            <input type="text" name="name" value={editForm.name} onChange={handleInputChange} placeholder={img.name} />
            <input type="text" name='description' value={editForm.description} onChange={handleInputChange} placeholder={img.description} />
            <div>
            <button className="btn btn-success" type="submit" onClick={handleEditSubmit}>save</button>
            <button className="btn btn-warning" onClick={()=> setEditImage(null)} >cancel</button>
            </div>
          </li>
            :
            <li key={img._id}>
              <img src={img.url} alt={img.name} onClick={()=>onImageClick(img)} />
              <p onClick={()=>onImageClick(img)} >{img.name}</p>
              <div>
              <button onClick={()=>handlerDeleteImage(img)} className="btn btn-warning ml-1" >Delete</button>
              <button onClick={()=>handlerEditImage(img)} className="btn btn-success" >Edit</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default ImageList;
