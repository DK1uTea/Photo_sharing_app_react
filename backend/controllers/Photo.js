import PhotoModel from "../models/PhotoModel.js";
import mongoose from "mongoose";

// get all photos of user
export const getUserPhotos = async (req, res) => {
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
};

// upload a new photo
export const uploadNewPhoto = async (req, res) => {
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
};