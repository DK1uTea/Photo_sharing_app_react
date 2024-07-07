import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Divider, Avatar, Grid, Button } from '@mui/material';

export default function UserDetail({userId: propUserId}) {
  const { userId: routeUserId } = useParams();
  const userId = propUserId || routeUserId;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('There was an error fetching the user details!', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{color: 'white'}}>
      <Typography variant="h4">{user.first_name} {user.last_name}'s Information</Typography>
      <Divider sx={{backgroundColor: 'white'}}/>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item>
          <Avatar alt={user.first_name} src={`/static/images/avatar/${user._id}.jpg`} />
        </Grid>
        <Grid item>
          <Typography variant='body1'><strong>First name: </strong>{user.first_name}</Typography>
          <Typography variant='body1'><strong>Last name: </strong>{user.last_name}</Typography>
          <Typography variant="body1"><strong>Occupation: </strong>{user.occupation}</Typography>
          <Typography variant="body1"><strong>Location: </strong>{user.location}</Typography>
          <Typography variant="body1"><strong>Description: </strong>{user.description}</Typography>
        </Grid>
      </Grid>
      <br />
      <Button 
        variant="contained" 
        component={Link} 
        to={`/photos/${user._id}`}
      >
        Show {user.first_name} {user.last_name} photos
      </Button>
    </div>
  );
}
