import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_time: String,
    comment: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photo_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;