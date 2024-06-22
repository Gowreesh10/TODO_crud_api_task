const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_URI);
        console.log('MongoDB connected....')
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;