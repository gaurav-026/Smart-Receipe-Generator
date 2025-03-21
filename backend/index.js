const express = require('express');
const fileUpload = require("express-fileupload"); 
require('dotenv').config();
var cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin:'*'
}))

app.use(express.json());

//middleware for file upload
app.use(fileUpload(
    {
     useTempFiles : true,
     tempFileDir : '/tmp/'
    }
 ));

const routes = require('./routes/route');

//mount the api
app.use('/api/v1', routes);

app.listen(PORT, ()=>{
    console.log(`Server started successfully at port ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();


app.get('/', (req, res)=>{
    res.send("Backend is Working. This is server page!");
})



