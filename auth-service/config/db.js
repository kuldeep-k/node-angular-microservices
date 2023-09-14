const mongoose = require('mongoose');

module.exports = async function getDb() {

    return mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices', {
        useNewUrlParser: true, useUnifiedTopology: true,
        serverSelectionTimeoutMS: 8000
    });
    // .then((result) => console.log('connected to db'));
    // .catch((err) => console.log(err));

}