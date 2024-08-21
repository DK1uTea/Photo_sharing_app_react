import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

// get all of user
export const getUserList = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

// get information of user
export const getUserInfor = async (req, res) => {
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
};

// user register
export const registerUser = async (req, res) => {
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
};

// user login
export const loginUser = async (req, res) => {
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
};