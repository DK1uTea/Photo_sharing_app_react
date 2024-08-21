import express from 'express';
// import { schemaModel, userListModel, userModel, photoOfUserModel , commentsOfPhotoModel} from './modelData/photoApp.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserModel from './models/UserModel.js';
import PhotoModel from './models/PhotoModel.js';
import CommentModel from './models/CommentModel.js';
import multer from 'multer';
import path from 'path';

dotenv.config();

const URI = process.env.URI_DB;

const secret = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const portno = 3001; // Port number to use

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use the absolute path of the images directory in the frontend
    cb(null, path.join(__dirname, '../../photo_sharing/frontend/public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Naming the file with a timestamp to avoid conflicts
  }
});

const upload = multer({ storage: storage });

//middleware
app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../photo_sharing/frontend/public')));

//Routes
app.get('/', function (req, res) {
  res.send('Simple web server of files from ' + __dirname);
});

app.get('/test/:p1', function (req, res) {
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

/**
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', async function (req, res) {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if(!user) {
      res.status(404).send('Not found!');
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get('/photosOfUser/:id', async function (req, res) {
  const id = req.params.id;
  try {
    const photos = await PhotoModel.find({ user_id: id });
    if (photos.length === 0) {
      res.status(404).send('Not found');
      return;
    }
    res.status(200).send(photos);
  } catch (error) {
    res.status(500).send(error);
  }
});
/*
  URL /commentsOfPhoto/:photoId - Return the comments of each photo for User (id)
*/
app.get('/commentsOfPhoto/:photoId', async function (req, res) {
  const photoId = req.params.photoId;
  try {
    const comments = await CommentModel.find({ photo_id: photoId }).populate('user', 'first_name last_name');
    // if (comments.length === 0) {
    //   res.status(404).send('Not found');
    //   return;
    // }
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * URL /api/register - Register a new user
 */
app.post('/api/register', async (req, res) => {
  const { email, password, first_name, last_name, description, location, occupation } = req.body;
  
  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
      first_name,
      last_name,
      description,
      location,
      occupation,
    });
    
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

/*
  URl /api/login - Login into app
*/
app.post('/api/login', async (req, res) => {  
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });  // Corrected query
    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }
    console.log('User found: ', user);
    const isPasswordValid = await bcrypt.compare(password, user.password);  // Secure password comparison
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });  // Generate JWT token

    res.status(200).send({ token, user, message: 'Login successful' });  // Send token, user to client
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
});

/* 
  URL: /comments - Adding new comment
*/
app.post('/comments', async (req, res) => {
  const { commentText, userId, photoId } = req.body;
  console.log(req.body);
  try {
    const newComment = new CommentModel({
      _id: new mongoose.Types.ObjectId(),
      date_time: new Date().toISOString(),
      comment: commentText,
      user: userId,
      photo_id: photoId,
    });

    await newComment.save();
    const populatedComment = await CommentModel.findById(newComment._id).populate('user', 'first_name last_name').exec();
    res.status(201).send(populatedComment);
    console.log({populatedComment});
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Error creating comment');
  }
});

/**
 * URL /upload - Upload a photo
 */
app.post('/upload', upload.single('photo'), async (req, res) => {
  const { description, userId } = req.body;
  const filePath = req.file ? req.file.filename : null;
  console.log(req.body);

  if (!filePath) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const photo = new PhotoModel({
      _id: new mongoose.Types.ObjectId(),
      date_time: new Date().toISOString(),
      file_name: filePath,
      user_id: userId,
      description: description,
    });

    await photo.save();
    res.status(201).send('Photo uploaded successfully.');
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).send('Error uploading photo.');
  }
});


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
  })


