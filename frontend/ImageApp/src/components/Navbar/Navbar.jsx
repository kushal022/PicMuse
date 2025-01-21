import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');


  
  useEffect(()=>{
    const token = localStorage.getItem('token');
    // console.log(token)
    if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(decodedToken.username);
      setUser(decodedToken.username); 
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  } else {
    console.log('No token found');
  }
},[])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser('');
    // navigate('/account/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery/images">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Contact</Link>
              </li>
              {!user ? (<>
              <li className="nav-item">
                <Link className="nav-link" to="/account/login" >Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/account/signup' >Signup</Link>
              </li>
              </>):(<>
                <li className="nav-item">
                <Link className="nav-link text-capitalize" >{`Welcome ${user}`}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/account/login" onClick={handleLogout} >Logout</Link>
              </li>
              </>)
              }
              <li className="nav-item">
                <Link className="nav-link">Add Image</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
