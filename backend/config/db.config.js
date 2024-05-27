const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB');
    }
}

module.exports = connectDB;