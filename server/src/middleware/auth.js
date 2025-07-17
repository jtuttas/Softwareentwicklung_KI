
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).send('A token is required for authentication');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Administrator') {
        return res.status(403).send('Administrator role required');
    }
    next();
};

const isAbteilungsleiter = (req, res, next) => {
    if (req.user.role !== 'Abteilungsleiter' && req.user.role !== 'Administrator') {
        return res.status(403).send('Abteilungsleiter role required');
    }
    next();
};

module.exports = { verifyToken, isAdmin, isAbteilungsleiter };
