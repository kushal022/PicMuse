// const Footer = ()=>{
//     return(
//        <div className="card d-flex flex-row justify-content-around">
//         <div className="p-3">
//             <h3>company name</h3>
//             <p className="w-25">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt cumque unde sit corporis minus voluptates ipsum ducimus recusandae nulla totam, odio exercitationem harum dolorem nam consectetur corrupti ipsam distinctio atque.</p>
//         </div>
//         <div>
//             <h3>products</h3>
//             <p>Product</p>
//             <p>Product</p>
//             <p>Product</p>
//             <p>Product</p>
//             <p>Product</p>
//         </div>
//         <div>
//             <h3>useful links</h3>
//             <p>Your Account</p>
//             <p>Become an Affiliate</p>
//             <p>Shipping Rates</p>
//             <p>Help & Support</p>
//         </div>
//         <div>
//             <h3>contact</h3>
//             <p>Phone: +1-123-456-7890</p>
//             <p>Email: support@example.com</p>
//             <p>Address: 123 Main St, City, State, Zip</p>
//             <p>Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
//             <p>Call Us Toll-Free: 1-800-123-4567</p>
//         </div>
//        </div>
//     )
// }

// export default Footer;

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +1 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Your Website Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
