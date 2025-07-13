const Application = require('../models/apply.model');
const Job = require('../models/job.model');

exports.applyToJob = async (req, res) => {
    const { jobId } = req.params;
    const { name, email, phone, education, skills, address, resumeUrl, certificateUrl } = req.body;

    const userId = req.user._id; // from auth middleware

    try {
        // Check for duplicate application
        const exists = await Application.findOne({ job: jobId, applicant: userId });
        if (exists) {
            return res.status(400).json({ msg: 'Already applied to this job' });
        }

        // Optional: verify the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        const application = new Application({
            job: jobId,
            applicant: userId,
            name,
            email,
            phone,
            education,
            skills,
            address,
            resumeUrl,
            certificateUrl
        });

        await application.save();

        res.status(201).json({ msg: 'Application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.getApplicantsForEmployer = async (req, res) => {
  try {
    const employerId = req.user._id;

    const jobs = await Job.find({ employer: employerId }).select('_id');
    const jobIds = jobs.map(job => job._id);

    console.log("Employer ID:", employerId);
    console.log("Jobs found:", jobs);
    
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('applicant', 'name email phone resumeUrl')
      .populate('job', 'title');

    console.log("Applications found:", applications);

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error("Error in getApplicantsForEmployer:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
