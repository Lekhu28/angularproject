const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access denied: Unauthorized role' });
        }
        next();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
      }
    };
  };
  
  module.exports = roleMiddleware;
  