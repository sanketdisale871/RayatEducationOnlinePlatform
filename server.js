const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const bodyparser = require("body-parser")
const path = require('path')
const session = require("express-session");

const{v4 :uuidv4}=require("uuid");


const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path : 'config.env'})
const port = process.env.PORT || 8080

// log request
app.use(morgan('short')); // this return the , :method :url :status :res[content-length] - :response-time ms

// Mongo DV connection
connectDB();

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true})) // this make readable file

// set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs")) --> If we created ont folder in views folder and inside it ejs folder

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


app.use(session({
    secret:uuidv4(), // secreat long key
    resave:false,
    saveUninitialized:true
}));


/* Load router*/

app.use('/',require('./server/routes/router'))


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

