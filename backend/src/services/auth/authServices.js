const bcrypte = require('bcrypt');
const User = require('../../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Order = require('../../models/Order');


const createUser = async (userData) => {
    try {
        const email = userData.email;
        const password = userData.password;
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new Error('User already exists.');
        };
        const hashedPassword = await bcrypte.hash(password, 10);
        const user = new User({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            role: 'CUSTOMER',
        });
        const newOrder = new Order({
            amount: 0,
            address: 'Default Address',
            orderStatus: 'Pending',
            user: user._id,
        });
        await newOrder.save();
        await user.save();  
        return user;

    } catch (error) {
        console.error( `Error creating user account: ${error}`);
    
    }
};

const loginUser = async (userData) => {
    try {
        const email = userData.email;
        const password = userData.password;
        
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            throw new Error('User not exists.');
        };
        
        const isPasswordValid = await bcrypte.compare(password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password.');
        }
        const token=jwt.sign({ id: existingUser._id , role : existingUser.role},
            process.env.JWT_SECRET,
            { expiresIn: '1d' }    
        );
        return {token , id: existingUser._id};

    } catch (error) {
        console.error( `Error creating user account: ${error}`);
    
    }
};
module.exports = {
    createUser,loginUser
};
