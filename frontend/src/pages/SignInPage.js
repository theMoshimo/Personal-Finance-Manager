// src/pages/SignInPage.js
// Importing necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/FormPage.css';

// Functional component for the Sign In Page
function SignInPage() {
  // useState hooks for managing form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Handler function for sign in form submission
  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = { email, password }; // Create a user object

    // Make a POST request to the sign-in API endpoint
    axios.post('http://localhost:5000/api/v1/user/login', user)
      .then(response => {
        // Extract the JWT token from the response
        const token = response.data.token;

        // Save the token in localStorage
        localStorage.setItem('token', token);

        // Log success and navigate to home page
        console.log('Sign in successful:', response.data);
        navigate('/home');
      })
      .catch(error => console.error('Error during sign in:', error)); // Log any errors
  };

  // Render the sign in form
  return (
    <div className="form-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

// Exporting the SignInPage component as the default export
export default SignInPage;
