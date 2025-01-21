import { Link, Navigate, useNavigate } from 'react-router';
import './LandingPage.css'

const LandingPage = ()=>{
    const navigate = useNavigate()
    return(
            <div className="landing-container">
            <div className="landing-box">
                <h1>Welcome to your dream Gallery</h1>
                <p>Discover Stunning images and timeless creativity</p>
                <button onClick={()=> navigate('/account/signup')} >Explore Gallery</button>
                {/* <Link className='home-link' to='/home' >Explore Gallery</Link> */}
            </div>
            </div>
    )
};

export default LandingPage;