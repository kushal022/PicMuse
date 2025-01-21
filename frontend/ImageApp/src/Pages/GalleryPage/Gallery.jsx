import ImageList from '../../components/ImageList/ImageList';
import './Gallery.css'
import { useState } from 'react';
import ModalImage from '../../components/Modal/ModalImage';
const Gallery = ()=>{
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [modalImage, setModalImage] = useState(null)
    const [isModalOpen,setIsModalOpen] = useState(false)
    
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    // Handle for image click:
    const handleImageClick = (img)=>{
        console.log('clicked on img')
        setModalImage(img);
        setIsModalOpen(true)
        console.log(modalImage)
    }

    return(
        <div className="gallery-container">
            <h1>Image Gallery</h1>
            <p>Welcome to your dream gallery! Discover stunning images and timeless creativity.</p>
            <select value={selectedCategory} onChange={(e)=> handleCategoryChange(e.target.value)}>
                {/* <option value="">Select a category</option> */}
                <option value="all">All</option>
                <option value="Nature">Nature</option>
                <option value="Animals">Animals</option>
                <option value="Architecture">Architecture</option>
                <option value="History">History</option>
                {/* <option value="other">Other</option> */}
            </select>
            {modalImage && <ModalImage modalImage={modalImage} setModalImage={setModalImage} />}
            <ImageList onImageClick={handleImageClick} selectedCategory={selectedCategory} />

            {/* {isModalOpen ? 
            <ModalImage modalImage={modalImage} setModalImage={setModalImage} /> :
            <ImageList onImageClick={handleImageClick} selectedCategory={selectedCategory} />
        } */}
        </div>
    )
}

export default Gallery;