import express from 'express';
import {getUserPhotos, uploadNewPhoto} from '../controllers/Photo.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Use the absolute path of the images directory in the frontend
      cb(null, path.join(__dirname, '../../../photo_sharing/frontend/public/images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Naming the file with a timestamp to avoid conflicts
    }
});
  
const upload = multer({ storage: storage });

const router = express.Router();

// URL /photosOfUser/:id -- Return the photos for user
router.get('/photosOfUser/:id', getUserPhotos);

// URL /uploadNewPhoto -- Post upload a new photo
router.post('/uploadNewPhoto', upload.single('photo'), uploadNewPhoto);

export default router;