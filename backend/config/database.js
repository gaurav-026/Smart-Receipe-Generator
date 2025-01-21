const { error } = require('console');
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("Db connected successfully!!!")
    })
    .catch((error)=>{
        console.log("Issues in Db Connection");
        console.log(error);
    })
}

module.exports = dbConnect;
