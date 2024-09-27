const express = require('express')
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contactSchema.js');
const { userId } = require('./userController.js')
const secretValue = process.env.SECRET_KEY


const getAllContacts = async (req, res) => {
    try {
        const userId = req.user._id;
        const contacts = await Contact.find({ userId })
        if (contacts.length === 0) {
            return res.status(200).json({ message: 'No contacts found', contacts:[]});
        }
        res.status(200).json({message: 'All contacts fetched succcessfully', contacts})
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Contacts',
            error: error.message

        })
    }
}

const getOneContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.user._id;
        const contact = await Contact.findOne({ _id: contactId, userId});
        if(!contact){
            return res.status(404).json({message: 'Contact Not Found'})
        }
        // const OneContact = await Contact.findById(contactId)
        res.status(200).json({message: 'Contact Fetched succesfully', contact})
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Contact',
            error: error.message
        })
    }
}

const createContact = async (req, res) => {
    try {
        const data = req.body;
        data.userId = req.user._id;
        const newContact = await Contact.create(data)

        res.status(201).json({message: 'New Contact created successfully', newContact})
    } catch (error) {
        res.status(400).json({
            message: 'Error Creating Contact',
            error: error.message
        })
    }
}


const updateContact = async (req, res) => {
    try {
        const {id} = req.params;
        const userId =req.user._id;
        const updatedContact = await Contact.findOne({_id: id, userId});

        if(!updatedContact){
           return res.status(404).json({
            message: 'Contact Not Found'
           })
        }
        const updatedContactDone = await Contact.findByIdAndUpdate(id, req.body, { new: true })
 
        res.status(200).json({message: 'Contact updated Successfully', updatedContactDone})
    } catch (error) {
        res.status(500).json({
            message: 'Error in updating contact',
            error: error.message
        })
    }
}


const removeContact = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const deleteContact = await Contact.findOne({ _id: id, userId});
        if(!deleteContact){
            return res.status(404).json({
                message: 'Contact Not Found'
            })
        }
      await Contact.findByIdAndDelete(id);
      res.status(200).json({
        message: `Contact by name : ${deleteContact.name} deleted successfully`
      })
    } catch (error) {
        res.status(500).json({
            message: 'Error in Deleting Contacts',
            error: error.message
        })
    }
}


module.exports = {
    getAllContacts,
    getOneContact,
    createContact,
    updateContact,
    removeContact
}
