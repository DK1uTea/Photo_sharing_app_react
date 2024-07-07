import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import UploadPhoto from './components/UploadPhoto';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className='app-background'>
        <div className="bg"></div>
        <div className="star-field">
          <div className="layer"></div>
          <div className="layer"></div>
        </div>
        {isAuth ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar user={user} onLogout={handleLogout} onToggleUserList={toggleUserList} /> 
            </Grid>
            <Grid item sm={3} className='side-bar' style={{ display: showUserList ? 'block' : 'none' }}> {/* Conditionally render UserList */}
              <UserList />
            </Grid>
            <Grid item sm={showUserList ? 9 : 12} className='main-section'> 
              <Routes>
                {user && (
                  <>
                    <Route path='/users/:userId' element={<UserDetail />} />
                    <Route path='/photos/:userId' element={<UserPhotos />} />
                    <Route path='/profile' element={<UserDetail userId={user._id} />} />
                    <Route path='/my-photos' element={<UserPhotos userId={user._id} />} />
                    <Route path='upload-photo' element={<UploadPhoto />}></Route>
                  </>
                )}
                <Route path='*' element={<Navigate to='/users' />} />
              </Routes>
            </Grid>
          </Grid>
        ) : (
          <div className='auth-container'>
            <Routes>
              <Route path='/login' element={<Login setIsAuth={setIsAuth} setUser={setUser} />} />
              <Route path='/register' element={<Register />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
