import { Button } from '@mui/material';
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setIsAuth, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });
      console.log('submit');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setIsAuth(true);
      navigate('/users');
      console.log('Login successfully!');
    } catch (error) {
      console.log('login failed!')
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h1 className='login-title'>WELCOME TO PHOTO SHARING APP</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-email-label'>
          Email
          <input type='email' placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </label>
        <label className='login-password-label'>
          Password
          <input type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <div className="register-link">
          <Link to="/register">Do not have an account? Register now!</Link>
        </div>
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
}
