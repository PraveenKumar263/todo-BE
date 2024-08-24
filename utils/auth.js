const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const auth = {
    verifyToken: (request, response, next) => {
        try {
            // get the token from the request cookies
            const token = request.cookies.token;

            // if the token does not exist, return an error
            if (!token) {
                return response.status(401).json({ message: 'Unauthorized' });
            }

            // verify the token
            try {
                const decoded = jwt.verify(token, JWT_SECRET);

                // set the user data in the request object
                request.userId = decoded.id;

                // call the next middleware
                next();
            } catch (error) {
                return response.status(401).json({ message: 'Invalid token' });
            }
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    isAdmin: async (request, response, next) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // get the user from the database
            const user = await User.findById(userId);

            // if the user is not an admin, return an error
            if (user.role !== 'admin') {
                return response.status(403).json({ message: 'Forbidden' });
            }

            // if the user is an admin, call the next middleware
            next();
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = auth;