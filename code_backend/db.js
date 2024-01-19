const mongoose = require('mongoose');

const dbconnection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test', {

        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = dbconnection;
