require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});