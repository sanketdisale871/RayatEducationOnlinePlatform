const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        // MongoDB connection String
        const conne = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${conne.connection.host}`);

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
