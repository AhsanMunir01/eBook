const bcrypte = require('bcrypt');
const User = require('../../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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
        return token;

    } catch (error) {
        console.error( `Error creating user account: ${error}`);
    
    }
};
module.exports = {
    createUser,loginUser
};
