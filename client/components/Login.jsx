/**
 * @module Login
 * @description stateful component that handles login functionality
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Travelotl_Logo.png';
import travelVideo from '../assets/flying_224323391_Video_4K_Preview.mp4';

// import Header from './Header.jsx';

const Login = () => {
    // Initialize empty state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Needed to navigate to different pathways
    const navigate = useNavigate();

    /* handleSubmit: asynchoronous event handling function
      - handles the submission of the login form
      - makes a POST request to the server with inputted email and password
      - stores a user token in local storage, then navigates back to main page
    */
   const handleSubmit = async (e) => {
      e.preventDefault();

      // Make fetch request with submitted data
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })

      // Check for ok response and redirect back to main
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('userToken', user.token);
        console.log(user);
        navigate('/');
      }
   };

   return(
    <div className="min-h-screen flex justify-center  items-center">
      <img src={Logo} style={{height: '200px', width: '300px', position : 'absolute', left: '10%', top: '1%', zIndex: '3', transform: 'translateX(-50%)'   }} alt= 'Travolotl Logo'/>  
      
      <header className="flex items-center justify-center h-screen overflow-hidden" />
      
        <video
            autoPlay
            loop
            muted
            className="absolute min-w-screen min-h-screen"
            style={{height:'105vh', width: '115vw' }}
        >
            <source

                src={travelVideo}
                type="video/mp4"
            />
        Your browser does not support the video tag.
        </video>
        
      <div style={{position : 'absolute', left: '20%', top: '50%', zIndex: '3', transform: 'translateX(-50%)'   }}>
        <h2 className="text-3xl font-semibold text-center text-gray mt-[-50px] mb-8">
          Login
        </h2>
        {/* <Header /> */}
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='codesmith@test.com'/>
            </label>
            <br />
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Not 1234'/>
            </label>
            <br />
            <button type='submit'>Login</button>
        </form>
    </div>
    </div>
   );
};

export default Login;