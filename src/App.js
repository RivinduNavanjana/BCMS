// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import logo from './logo.png';
import google from './google.png';
import ms from './microsoft.png';
import 'tailwindcss/tailwind.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './msalConfig';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import GoogleSignIn from './GoogleSignIn';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/google-signin" element={<GoogleSignIn />} />
        </Routes>
      </Router>
      </MsalProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

