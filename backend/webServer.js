import express from 'express';
// import { schemaModel, userListModel, userModel, photoOfUserModel , commentsOfPhotoModel} from './modelData/photoApp.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './routers/User.js';
import Photo from './routers/Photo.js';
import Comment from './routers/Comment.js';
dotenv.config();

const URI = process.env.URI_DB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const portno = process.env.PORT; // Port number to use

const app = express();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../photo_sharing/frontend/public')));

//Routes
app.get('/', (req, res) => {
  res.send('Simple web server of files from ' + __dirname);
});

app.get('/test/:p1', (req, res) => {
  const param = req.params.p1;
  if (param !== "info") {
    res.status(400).send('Not found');
    return;
  }
  
  const info = {
    load_date_time: new Date(),
    version: '1.0.0'
  };
  res.status(200).send(info);
});

// api User
app.use('/api', User);
//api Photo
app.use('/api', Photo);
//api Comment
app.use('/api', Comment);

mongoose.connect(URI)
  .then(() => {
    console.log('Connected to database');
    const server = app.listen(portno, () => {
      const port = server.address().port;
      console.log(`Listening at http://localhost:${port} exporting the directory ${__dirname}`);
    });
  })
  .catch(err => {
    console.log('err', err);
  });

