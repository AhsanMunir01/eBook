const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { createAnAdminAccount } = require('./utils/common');
const app = express();
const authRoute = require('./routes/auth/authRoute');
const adminBookRoute = require('./routes/admin/bookRoute');
const customerBookRoute = require('./routes/customer/customerRoute');
const customerCartRoute = require('./routes/customer/cartRoute');
const customerOrderRoute = require('./routes/customer/orderRoute');
const testRoute = require('./routes/testRoute');


const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const corsOrigin = process.env.CORS_ORIGIN;

// Enable CORS for all routes with a more permissive configuration for development
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
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

app.use('/api/admin/books', adminBookRoute);

app.use('/api/customer/books', customerBookRoute);

// Modify this line for debugging
app.use('/api/customer/cart', customerCartRoute);

//app.use('/api/customer/orders', customerOrderRoute);

// Add a direct route for testing
app.use('/api/test', testRoute);