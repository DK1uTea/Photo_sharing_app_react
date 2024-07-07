import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('description', description);
    formData.append('userId', JSON.parse(localStorage.getItem('user'))._id);

    try {
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Photo uploaded successfully!');
      console.log('Photo uploaded successfully');
      navigate('/my-photos');
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, color: 'white' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Upload Photo</Typography>
      <form onSubmit={handleSubmit} style={{ width: '50%', marginTop: '20px', color: 'white' }}>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          margin="normal"
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' },
            notchedOutline: { borderColor: 'white' }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            }
          }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ margin: '20px 0', color: 'white' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Upload</Button>
      </form>
    </Box>
  );
}
