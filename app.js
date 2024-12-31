require('dotenv').config();
const express = require('express');
const app = express();
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./config/db')

connectDB();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.Sec_Key,
    cookie:{
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));


app.set("views",path.join(__dirname,"views"));
app.set('view engine','ejs');




const indexRouter = require('./routes/index-router');
app.use("/",indexRouter);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});





