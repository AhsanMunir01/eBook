const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { createAnAdminAccount } = require('./utils/common');
const app = express();
const authRoute = require('./routes/auth/authRoute');

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('MongoDB connected successfully');
        createAnAdminAccount();  // Call the function here
    })
    .catch(err => {
        console.error(`MongoDB connection error: ${err}`);
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/auth', authRoute);