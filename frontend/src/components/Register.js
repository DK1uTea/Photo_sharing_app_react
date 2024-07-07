import { Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import './Register.css'
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password do not match!");
            return;
        }
        try {
            await axios.post('http://localhost:3001/api/register', {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                description,
                location,
                occupation
            });
            alert("Registration successful!");
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Email already exists!");
            } else {
                alert("Registration failed!");
            }
            console.log(error);
        }
    }

    return (
    <div>
        <h1 className='title'>Register for Photo Sharing App</h1>
        <form className='register-form' onSubmit={handleSubmit}>
            <label className='register-email-label'>
            Email
                <input type='email' placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <label className='register-password-label'>
            Password
                <input type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <label className='register-confirmpass-label'>
            Confirm Password
                <input type='password' placeholder='Confirm your password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </label>
            <label className='firstname-label'>
            First name
                <input type='text' placeholder='Enter your first name' required value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            </label>
            <label className='lastname-label'>
            Last name
                <input type='text' placeholder='Enter your last name' required value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            </label>
            <label className='description-label'>
            Description
                <input type='text' placeholder='Enter your description' required value={description} onChange={(e) => setDescription(e.target.value)}></input>
            </label>
            <label className='location-label'>
            Location
                <input type='text' placeholder='Enter your Location' required value={location} onChange={(e) => setLocation(e.target.value)}></input>
            </label>
            <label className='occupation-label'>
            Occupation
                <input type='text' placeholder='Enter your Occupation' required value={occupation} onChange={(e) => setOccupation(e.target.value)}></input>
            </label>
            <Button type='submit'>Register</Button>
        </form>
    </div>
  )
}
