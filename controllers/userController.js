const User = require('../models/userModel');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// create JWT function
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const user = await User.login( email, password );
          
        const token = createToken(user._id);  
        res.status(200).json({ message: 'Login successful', _id:user._id, name:user.name, role:user.role, email:user.email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);
        res.status(201).json({ message: 'User created successfully',token, _id:user._id, name:user.name, role:user.role, email:user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};

// getall users     
const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },  
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }   
        res.status(200).json({ message: 'User updated successfully', updatedUser});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }   
};


// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = {
    loginUser,
    signupUser,
    getAllUser,
    updateUser,
    deleteUser
};