import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
export default function UserList() {
  const [users, setUsers] = useState([]); // Tạo state để lưu danh sách người dùng

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng khi component được mount
    fetch('http://localhost:3001/api/user/list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data); // Cập nhật state với danh sách người dùng
      })
      .catch(error => {
        console.error('There was an error fetching the user list!', error);
      });
  }, []); // [] để chỉ gọi một lần khi component mount

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {users.map(user => (
        <React.Fragment key={user._id}>
          <ListItem alignItems="flex-start" component={Link} to={`/users/${user._id}`}>
            <ListItemAvatar>
              <Avatar alt={user.first_name} src={`/static/images/avatar/${user._id}.jpg`} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.location}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
