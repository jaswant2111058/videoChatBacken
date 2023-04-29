
const jwt = require('jsonwebtoken');


// --------------authMiddleware-----------------

// attach team_id (mongodb) with req
exports.authMiddleware = async (req, res, next) => {
    try {
        const authorization_header_token = req.params.token||req.headers.authorization;
        console.log(authorization_header_token)
        if (!authorization_header_token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = authorization_header_token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.email = decoded.email;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expired"
            });
        }

        console.log(typeof(error));
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

// put Team mongodb id in jwt
exports.adminLogin = async (req, res) => {
    try {
        const  email= process.env.ADMINEMAIL;
        const  password= process.env.ADMINPASSWORD;

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        // update login_count

        res.status(200).send({
            msg: `user logged in`, user: {
              email: email,
              token: token,
              expires_in: new Date(Date.now() + 60*60*1000),
            }
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}
