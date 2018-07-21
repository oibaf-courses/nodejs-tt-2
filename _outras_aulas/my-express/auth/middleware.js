const authMiddleware = (req, res, next) => {
    const { user, password } = req.query;
    if (user !== 'root' || password !== 'toor') {
        res.status(401);
        res.end();
        return;
    }
    next();
};

module.exports = authMiddleware;