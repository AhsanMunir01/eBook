const {createUser, loginUser} = require('../../services/auth/authServices');

const signup = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    catch (error) {
        if (error.code === 11000) {  // MongoDB duplicate key error
            return res.status(406).json({
                success: false,
                message: 'Email already exists',
                error: 'duplicate_email'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message,
            error: 'registration_failed'
        });
    }
}

const login = async (req, res) => {
    try {
        const {token, id} = await loginUser(req.body);
        
        
        res.status(200).json({
            message: 'Login successfully',
            token: token,
            id: id
    });
        
    
}
    catch (error) {
        res.status(400).json({
        error: error.message
        });
    }
}


module.exports = {
    signup,
    login
};