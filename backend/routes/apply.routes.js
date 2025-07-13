const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const {applyToJob, getApplicantsForEmployer} = require('../controllers/apply.controller')

const router = express.Router();

router.post('/apply/:jobId', isAuthenticated, applyToJob);
router.get('/employer/applicants', isAuthenticated, getApplicantsForEmployer);

module.exports = router;
