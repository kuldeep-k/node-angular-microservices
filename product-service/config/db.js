const mongoose = require('mongoose');

module.exports = async function getDb() {
    console.log("In Side getDB");
    console.log(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
    return mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices', {
        useNewUrlParser: true, useUnifiedTopology: true,
        serverSelectionTimeoutMS: 8000
    });
    // .then((result) => console.log('connected to db'));
    // .catch((err) => console.log(err));

}