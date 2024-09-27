const express = require('express');
const jwt = require('jsonwebtoken')



const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token ||  !token.startsWith('Bearer ')) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const tokenCheck = token.split(' ')[1];
    try {
      const decoded = jwt.verify(tokenCheck, process.env.SECRET_KEY);
      req.user = decoded;
      console.log('User authenticated:', req.user);
      next();
    } catch (error) {
      console.log('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };


  module.exports ={
     authMiddleware 
  }