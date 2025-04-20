import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router';

// import { useNavigate,useState } from 'react-router';


const Signup = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [err,setErr] = useState(null);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/api/user/user-signup', formData);
      console.log('Signup Successful', response.data.message);
      alert('Signup Successful');
      setFormData({username:'', email:'', password:'' });
      navigation('/account/login');
      setErr(null);

    }
    catch(e){
      const errorMsg = e.response?.data?.message || "Something went wrong"
      console.log(errorMsg);
      alert(errorMsg);
      setErr(errorMsg);
    }

  }


  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <div className='error'>
        {err && <p className="err">{err}</p>}
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input type="text" id="username" name='username' value={FormData.username} onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name='email' value={FormData.email} onChange={handleChange} placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name='password' value={FormData.password} onChange={handleChange} placeholder="Enter your password" />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
          <Link to='/account/login' >Have an account? Log In</Link>

        </form>
      </div>
    </div>
  );
};

export default Signup;