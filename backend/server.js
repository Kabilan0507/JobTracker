require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("jobtrack api is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});