const bcrypte = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();
const createAnAdminAccount = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const firstName = process.env.ADMIN_FIRST_NAME;
        const lastName = process.env.ADMIN_LAST_NAME;
        const existingAdmin = await User.findOne({ email: email });
        if (existingAdmin) {
            console.log('Admin account already exists.');
            return;
        }
        const hashedPassword = await bcrypte.hash(password, 10);
        const admin = new User({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            role: 'ADMIN',
        });
        await admin.save();  
        console.log('Admin account created successfully.');

    } catch (error) {
        console.error('Error creating admin account:', error);
    }
};

module.exports = {
    createAnAdminAccount,
};
