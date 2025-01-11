const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis.config');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized User!' });
    }
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ error: 'Login first' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = authenticateUser;