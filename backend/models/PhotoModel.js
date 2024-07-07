import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_time: String,
    file_name: String,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const PhotoModel = mongoose.model('Photo', photoSchema);
export default PhotoModel;