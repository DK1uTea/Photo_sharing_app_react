import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, Divider, TextField } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserPhotos({ userId: propUserId }) {
  const { userId: routeUserId } = useParams();
  const userId = propUserId || routeUserId;
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [expandedPhotoId, setExpandedPhotoId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchPhotosWithComments(userId);
    }
  }, [userId]);

  const fetchUser = (userId) => {
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
  };

  const fetchPhotosWithComments = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/photosOfUser/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPhotos(data);
  
      const commentsData = {};
      for (const photo of data) {
        try {
          const response = await axios.get(`http://localhost:3001/commentsOfPhoto/${photo._id}`);
          commentsData[photo._id] = response.data;
        } catch (error) {
          console.error('There was an error fetching the comments!', error);
        }
      }
      setComments(commentsData);
    } catch (error) {
      console.error('There was an error fetching the photos!', error);
    }
  };
  
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const handleCommentSubmit = async (photoId) => {
    const currentUserId = getUserIdFromToken();
    if (!currentUserId) {
      console.error('User not logged in or invalid token');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/comments', {
        commentText: newComments[photoId],
        userId: currentUserId,
        photoId: photoId,
      });
      const newComment = response.data; 
      console.log({newComment});
      setComments(prevComments => ({
        ...prevComments,
        [photoId]: [...(prevComments[photoId] || []), newComment], // Cập nhật comment mới
      }));
      console.log('check');
      setNewComments(prevNewComments => ({
        ...prevNewComments,
        [photoId]: '',
      }));
    } catch (error) {
      console.error('There was an error posting the comment!', error);
    }
  };
  
  return (
    <div>
      <Typography variant="h4" component="h1" sx={{color: 'white'}}>
        {user ? `${user.first_name} ${user.last_name}'s Photos` : 'Loading...'}
      </Typography>
      <Divider sx={{backgroundColor: 'white'}}/>
      <br />
      {photos.length === 0 ? (
        <Typography variant="h5" component="h5" sx={{color: 'white'}}>
          This user has no photos.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {photos.map(photo => (
            <Grid item xs={12} sm={6} md={4} key={photo._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {photo.file_name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={<strong>{photo.file_name}</strong>}
                  subheader={'Photo date time: ' + new Date(photo.date_time).toLocaleDateString()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`/images/${photo.file_name}`}
                  alt={photo.file_name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {photo.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expandedPhotoId === photo._id}
                    onClick={() => setExpandedPhotoId(expandedPhotoId === photo._id ? null : photo._id)}
                    aria-expanded={expandedPhotoId === photo._id}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expandedPhotoId === photo._id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Comments:</Typography>
                    {/* <Divider sx={{backgroundColor: 'black'}}/> */}
                    {comments[photo._id] ? (
                      comments[photo._id].map(comment => (
                        <Typography key={comment._id} paragraph>
                          <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.comment}
                        </Typography>
                      ))
                    ) : (
                      <Typography paragraph>There are no comments on this photo yet!</Typography>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(photo._id); }}>
                      <TextField
                        label="Add your comment..."
                        variant="outlined"
                        fullWidth
                        value={newComments[photo._id] || ""}
                        onChange={(e) => setNewComments(prevNewComments => ({
                          ...prevNewComments,
                          [photo._id]: e.target.value,
                        }))}
                      />
                      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Add Comment
                      </Button>
                    </form>
                    {/* {newComments[photo._id] && (
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                        Your comment: {newComments[photo._id]}
                      </Typography>
                    )} */}
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
