import CommentModel from "../models/CommentModel.js";
import mongoose from 'mongoose';

// get the comments of each photo for user
export const getCommentsOfPhoto = async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const comments = await CommentModel.find({ photo_id: photoId }).populate('user', 'first_name last_name');
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
};

// add new comment
export const addNewComment = async (req, res) => {
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
};
