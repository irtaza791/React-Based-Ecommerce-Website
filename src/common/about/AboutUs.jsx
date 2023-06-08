import React from 'react';
import './AboutUs.css'; 
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';

const AboutUs = () => {
    return (
        <>
        <Navbar />
        <div className='about-us'>
            <h1>About Me</h1>
            <div className='profile'>
    
                <div className='profile-info'>
                    <h3>Name: Irtaza Arshad</h3>
                    <h3>Student Number: 2998989</h3>
                    <h3>Year: 4th</h3>
                    <h3>Module: Software Development</h3>
                </div>
            </div>
            <h1>About The Website</h1>
            <p>
                This website is a state-of-the-art eCommerce platform built using the latest technologies such as React, Firebase, and Material UI. Our aim is to provide a smooth and enjoyable shopping experience to our users.
            </p>
            <p>
                React powers the frontend, providing a fast, responsive user interface. Firebase handles the backend operations, offering robust and scalable cloud storage and authentication solutions. Material UI ensures a sleek and modern design, while offering a high degree of customizability.
            </p>
            <p>
                We believe in constant growth and improvement, and we are always working on bringing more features and improvements to our platform. Stay tuned for more!
            </p>
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
