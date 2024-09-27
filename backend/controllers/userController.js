const express = require('express')
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 



const registerUser = async (req, res) => {
    try {
       const {email, username, password} = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({email, username, password: hashedPassword});
       await newUser.save()
       res.status(201).json({message: 'New User Created Succesfully'});
 
    } catch (error) {
       res.status(500).json({error: 'Error Signing Up'})
    }
 }


 const getRegisteredUser = async(req, res) => {
    try{
     const users = await User.find()
     res.status(201).json(users);
    } catch(error){
        res.status(500),json({error :'Unable to get User'})
    } 

}

const loginUser =async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({error : 'Invalid Credentials'})
        }
        const isPasswordValid =await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error: 'Invalid Credentials'})
        }
        const token = jwt.sign({ _id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})
        res.json({message: 'User Login Successful', token: token})
    } catch (error) {
        res.status(500).json({error: 'Error Logging in'})
    }
}


 module.exports = {
    registerUser,
    getRegisteredUser,
    loginUser
 }
