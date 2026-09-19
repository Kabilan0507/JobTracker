const mongoose = require('mongoose');
const jobRoutes = require('./routes/JobRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("MongoDB connected successfully")})
    .catch((err) => {console.log("MongoDB connection error:", err)});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("jobtrack api is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});