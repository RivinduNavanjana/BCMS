// ForgotPassword.js
import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">Forgot Password</h2>
        <p className="text-center mb-4">Enter your email address to reset your password.</p>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-green-500 px-3 py-2 rounded-md focus:outline-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-navy to-green-500 py-2 px-4 text-center text-white font-medium hover:bg-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
