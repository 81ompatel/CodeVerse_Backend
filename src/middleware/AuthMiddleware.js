const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET || "codeverse_secret", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            req.user = decoded; // Contains id and role
            next();
        });
    } else {
        res.status(401).json({ message: "You are not authenticated!" });
    }
};

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "You are not authorized for this action!" });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    verifyRole
};
