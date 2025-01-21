import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';

const Login = () => {
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState(null); // Error message to display if login fails
  const navigate = useNavigate();


  const handlerChange = (e) => {
    setFormData({...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // API call to login user with the provided email and password
    // then redirect to the home page or gallery page
    try{
      console.log(FormData);
      const response = await axios.post('http://localhost:3000/api/users/login', FormData)
      console.log(response.data.message);
      alert(response.data.message)
      setFormData({
        email: '',
        password: '',
      })
      if(response.data.token){
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token)
        // Redirect to the home page or gallery page
        navigate('/gallery/images'); // Replace with the desired route after successful login
        setErr(null);
        // accessProtectedRoute()
      }
    }
    catch(err){
      const errorMsg = err.response?.data?.message || "Something went wrong";
      console.log(errorMsg);
      // console.log(err);
      alert(errorMsg)
      setErr(errorMsg)
    }
  }

  // const accessProtectedRoute = async ()=>{
  //   try{
  //     const token = localStorage.getItem('token');
  //     if(!token){
  //       throw new Error('Access Denied');
  //     }
  //     const response = await axios.get('http://localhost:3000/api/protected', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     console.log(response.data);
  //     // You can use the response data here to access the user's information
  //   }
  //   catch(err){
  //     console.log(err.message);
  //     localStorage.removeItem('token');
  //     navigate('/account/login'); // Replace with the desired route after logout
  //   }
  // }
  


  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Log In</h2>
        <div className='error-show'>
          {err && <p>{err}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name='email' value={FormData.email} onChange={handlerChange} placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' value={FormData.password} onChange={handlerChange} placeholder="Enter your password" />
          </div>
          <button type="submit" className="auth-button">Log In</button>
          <Link to='/account/signup' >Donn't have an account? Sign up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
