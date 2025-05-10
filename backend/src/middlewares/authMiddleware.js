const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const[bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            console.error(`Token verification error: ${error}`);
            return res.status(403).json({ message: 'Invalid token' });
        };
        req.user = user;
        next(); 
    })

};

const authorizeRole = (roles) => {
    return (req, res, next) => {
      if(req.user.role !== roles) {
        return res.status(403).json({ message: 'Forbidden: you do not have the correct role' });
      }
        next();
    };
};

module.exports = {
    authenticateJWT,
    authorizeRole
};