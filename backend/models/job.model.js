const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true,
    },
    company: {
        type: String,
        require: true,
    },
    experience: {
        type: String,
        require: true,
    },
    logo: {
        type: String,
        require: true,
    },
    skills: {
        type: String,
        require: true
    },
    education: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true
    },
    employer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('Job', jobSchema)