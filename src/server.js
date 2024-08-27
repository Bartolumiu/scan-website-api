require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;
const address = process.env.ADDRESS || '127.0.0.1';

app.use(express.json());
app.use(cors({
    origin: `http://localhost:${port}`,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

// Models
const Author = require('./models/Author');
const Cover = require('./models/Cover');
const Group = require('./models/Group');
const Tag = require('./models/Tag');
const Manga = require('./models/Manga');
const User = require('./models/User');

// Routes
require('./routes')(app);

// Start server and bind to localhost
app.listen(port, address, () => console.log(`Server is running on ${address}:${port}`));

// Export app for testing
module.exports = app;