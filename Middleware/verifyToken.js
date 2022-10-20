const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.token;
    console.log(authHeader);
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SEC, (err, result) => {
            if (err) {
                console.log(err);
                res.status(403).json({ "token": "Token not valid" });
            }
            console.log(result)
            req.user = result;
            next();
        })
    }
    else {
        return res.status(401).json("Not Authenticated");
    }
}
const verifyTokenAndAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json({ "message": "You are not authorized to access this page" });
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorize }