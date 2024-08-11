const app = require('./app');
const { MONGODB_URI, PORT } = require('./utils/config');

const mongoose = require('mongoose');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // start the server and listen on port 3001
        app.listen(PORT, () => {
            console.log(`Server running on port 3001 at http://127.0.0.1:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    });