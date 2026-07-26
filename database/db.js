const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        console.log('Mongodb url:', process.env.mongodb_URI2)
        await mongoose.connect(process.env.mongodb_URI2);
        console.log("Connection to Mongodb successful!")
    }catch(error){
        console.error("Unable to connect to Mongodb", error);
        
    }

}
module.exports = connectDb;