const mongoose = require('mongoose')

const applySchema = new mongoose.Schema({
    job: {
        type: mongoose.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{ 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    education: { 
        type: String, 
        required: true 
    },
    skills: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    resumeUrl: { 
        type: String 
    },
    certificateUrl: { 
        type: String 
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
},{timestamps:true})

module.exports = mongoose.model('Application',applySchema)