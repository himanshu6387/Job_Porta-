const Job = require('../models/job.model');
const User = require('../models/user.model');

exports.createJob = async (req, res) => {
    const { userId, title, location, skills, education, logo, experience, company } = req.body;

    // Validate required fields
    if (!userId || !title || !location || !skills || !education || !logo || !experience || !company) {
        return res.status(400).json({ message: 'All fields including userId are required.', success: false });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }


        // Create the job with createdBy ref
        const newJob = await Job.create({
            title,
            location,
            skills,
            education,
            logo,
            experience,
            company,
            employer:userId,   //It is show applicants
            createdBy: userId
        });

        // Push job ID into user's jobs array
        user.jobs.push(newJob._id);
        await user.save();

        res.status(201).json({ message: 'Job created successfully.', job: newJob, success: true });
    } catch (error) {
        console.error('Job creation failed:', error);
        res.status(500).json({ message: 'Server error while creating job.', success: false });
    }
};


exports.getMyJobs = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).populate('jobs')
        // console.log(user.jobs)
        if (!user) {
            return res.status(404).json({ message: 'User not exists', success: false })
        }
        return res.status(200).json({ message: 'Got Particular Jobs', success: true, jobs: user.jobs })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        if (!jobs) {
            return res.status(404).json({ message: 'Job not exists', success: false })
        }

        return res.status(200).json({ message: 'Got Job Successfully', success: true, jobs })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

exports.delteJobById = async (req, res) => {

    const { id } = req.params

    try {
        const job = await User.findByIdAndDelete(id).populate('jobs')
        if (!job) {
            return res.status(404).json({ message: 'Job not found', success: false })
        }
        return res.status(200).json({ message: 'Job Delted Successfully..', success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}