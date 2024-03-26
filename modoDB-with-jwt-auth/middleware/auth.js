const PrivateKey = "ShaadiMeinZaroorAana";
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {

        var payload = req.headers.authorization;
        jwt.verify(payload, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).send("Auth token verification failed");
            }
            next(); 
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message : err
        }); 
    }
} 

module.exports =  authMiddleware;
