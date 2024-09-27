const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   name: {type: String, required: true},
   phone: {type: Number, required:true},
   email: {type: String, required:true},
   address: {
    city: { type: String },
    state: { type: String },
    zip: { type: Number },
    country: { type: String }
  },
  image: {type: String, required:false},
  notes: { type: String },
  dateAdded: { type: Date, default: Date.now }

}, {
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact