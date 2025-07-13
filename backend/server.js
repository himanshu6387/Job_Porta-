const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/user.routes');
const jobRoute = require('./routes/job.routes');
const applyRoute = require('./routes/apply.routes');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/applied', applyRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
