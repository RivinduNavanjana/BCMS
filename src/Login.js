import React, { useState } from 'react';
import './style.css';
import logo from './logo.png';
import google from './google.png';
import ms from './microsoft.png';
import 'tailwindcss/tailwind.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";

const Login = () => {
  
    const { instance } = useMsal();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle login success, e.g., store user info, navigate, etc.
  };

  const handleError = (error) => {
    console.error('Login Failed:', error);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    window.location.href = './Signup';
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    window.location.href = './forgot-password';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission, e.g., send data to the server
      console.log('Form submitted successfully', formData);
    }
  };

  const handleMicrosoftLogin = () => {
    instance.loginPopup({
      scopes: ["user.read"],
      prompt: "select_account",
    }).then(response => {
      console.log("Microsoft login success:", response);
    }).catch(error => {
      console.error("Microsoft login error:", error);
    });
  };

  const handleGoogleLogin = () => {
    navigate('/google-signin');
  };


  return (
    <GoogleOAuthProvider clientId="303015563332-vndrvuapq98ga0res3j8iqg9kfpitbir.apps.googleusercontent.com">
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Main Container */}
        <div className="w-1/2 h-1/2 bg-white shadow-lg rounded-lg flex overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-1/2 bg-navy flex flex-col justify-center items-center text-white p-8 rounded-lg aspect-square border rounded-br-[70px]">
            <div className="text-center">
              <img src={logo} alt="SLT Mobitel Logo" className="mx-auto mb-4 w-auto h-20" />
              <h1 className="text-4xl font-bold text-sky">Business Continuity Management System</h1>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-1/2 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">Welcome Back !</h2>
              <h4 className="text-1xl mb-6 text-center text-blue-600">Please Fill your Login Details Below</h4>
              <form>
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="User Name" 
                    className="w-full p-1 border border-green-500 px-3 py-2 rounded-md focus:outline-green-500"
                    //value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="Service Number" 
                    className="w-full p-3 border border-green-500 px-3 py-2 rounded-md focus:outline-green-500"
                    //value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                  />
                  <span>Remember me</span>
                
                  <Link
                  to="/forgot-password"
                  className="text-sm ml-auto text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Forgot Password?
                </Link>
                </div>
                <button 
                  type="submit" 
                  className="w-full rounded-lg bg-gradient-to-r from-navy to-green-500 py-2 px-4 text-center text-white font-medium hover:bg-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
                >
                  Login
                </button>
              </form>
              <div className='mb-6'></div>
              <div className="text-center mt-4">OR</div>
              <div className='mb-6'></div>
              <div className="flex items-center justify-center space-x-8">
                
                  
              <button
                        type="button"
                        className="p-3 border border-gray-300 rounded-md flex items-center justify-center"
                        onClick={handleGoogleLogin}
                        
                      >
                        <img src={google} alt="Google Sign In" className="mx-auto w-6 h-6" />
                        
                      </button>
                    
                  
                  
                  <button
                    type="button"
                    className="p-3 border border-gray-300 rounded-md flex items-center justify-center"
                    onClick={handleMicrosoftLogin}
                    
                  >
                    <img src={ms} alt="Microsoft Sign In" className="mx-auto w-6 h-6" />
                   
                  </button>
                <div className="mb-4"></div>
              </div>
              <div className="text-center mt-4">
                If you are a customer? <Link to="/signup" className="text-green-500 hover:underline">Signup</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;