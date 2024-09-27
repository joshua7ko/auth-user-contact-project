const express = require('express');
const { getAllContacts,
        getOneContact,
        createContact,
        updateContact, 
        removeContact} = require('../controllers/contactController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js')       
const router = express.Router()


router.get('/contacts', authMiddleware, getAllContacts)

// router.get(`/contacts/:userId`, authMiddleware, getAllContacts) //of one user
router.get('/contacts/:id', authMiddleware, getOneContact)
router.post('/contacts', authMiddleware, createContact)
router.put('/contacts/:id', authMiddleware,  updateContact)
router.delete('/contacts/:id', authMiddleware, removeContact)

module.exports = router