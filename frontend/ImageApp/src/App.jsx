import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import ErrorPage from './Pages/ErrorPage/Error.jsx'
import HomePage from './Pages/HomePage/HomePage.jsx'
import Gallery from './Pages/GalleryPage/Gallery.jsx'
import Login from './Pages/LoginPage/Login.jsx'
import Signup from './Pages/SignupPage/Signup.jsx'
import { Route, Routes, useLocation, useParams } from 'react-router'

function App() {
  const location = useLocation();
  
  //Hide navbar on Landing page
  const isLandingPage = location.pathname === '/'; // true/false

  // Check if the current path is a valid route
  const validPaths = ['/', '/home','/signup','/login','/gallery/images','/about', '/contact']; // valid routes
  const isErrorPage = !validPaths.includes(location.pathname);

  return (
    <>
    {/* {isLandingPage ? null : <Navbar/>} */}
    {!isLandingPage && !isErrorPage && <Navbar/>}
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<HomePage/>} />
      <Route path='/gallery/images' element={<Gallery/>}/>
      <Route path='/account/login' element={<Login/>}/>
      <Route path='/account/signup' element={<Signup/>}/>
      <Route path='*' element={<ErrorPage/>} />
     </Routes>
     {!isLandingPage && !isErrorPage && <Footer/>}
    </>
  )
}

export default App
