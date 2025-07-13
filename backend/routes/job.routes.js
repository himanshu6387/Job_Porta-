const express = require('express')
const { getMyJobs, delteJobById, getAllJobs, createJob } = require('../controllers/job.controller')

const router = express.Router()

router.post('/createJob',createJob)

router.get('/getMyJob/:id',getMyJobs)

router.delete('/deleteJobById/:id',delteJobById)

router.get('/getAllJobs',getAllJobs)



module.exports = router