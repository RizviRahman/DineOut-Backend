const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = auth.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(_id).select('-password');
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Request is not authorized' });
    }
};
    

module.exports = requireAuth;