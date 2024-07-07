import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    location: String,
    description: String,
    occupation: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;