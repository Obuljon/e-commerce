import express from "express";
import layout from "express-ejs-layouts";
import session from "express-session";
import flash from "express-flash";
import moment from "moment";
import validator from "express-validator";
import  mongoose from "mongoose";
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from "cookie-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();


mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", { useNewUrlParser:true, useUnifiedTopology:true });


app.set('views', './src/views');
app.set("view engine", "ejs");
app.set("port", 8080);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(validator());
app.use(layout);
app.use(session({
    secret: "qwertyuiop",
    cookie: { maxAge: 1000 * 1800 * 60 },
    saveUninitialized:false,
    resave:false,
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.carts = req.session.carts || false;
    res.locals.search = req.session.search || false;
    res.locals.message = req.flash();
    res.locals.moment = moment;
    next();
    
});

import mainrouter from "./src/router/main.router.js";
import idpagerouter from "./src/router/idpage.router.js";
import apirouter from "./src/router/apirouter.js"
app.use("/api", apirouter)
app.use(mainrouter);
app.use(idpagerouter);

app.use((req, res)=>{
    res.status(404).sendFile(__dirname + '/public/404.html');
})

app.listen(app.get('port'), () => {
    console.info(`Server is running on PORT: ${app.get('port')}`);
});

import { spawn } from "child_process";
const indexProcess = spawn('node', ['admin.js']);

indexProcess.stdout.on('data', (data) => {
  console.log(`admin.js ishga tushirildi: ${data}`);
});






