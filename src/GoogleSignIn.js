// src/GoogleSignIn.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle login success (store user info, navigate, etc.)
    navigate('/'); // Redirect to home page after successful login
  };

  const handleError = (error) => {
    console.error('Login Failed:', error);
  };

  useEffect(() => {
    document.title = 'Sign in with Google';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in with Google</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
};

export default GoogleSignIn;
