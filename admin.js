import express from "express";
import layout from "express-ejs-layouts";
import session from "express-session";
import flash from "express-flash";
import  mongoose from "mongoose";
import moment from "moment";
import validator from "express-validator";
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", { useNewUrlParser:true, useUnifiedTopology:true });


app.set('views', './admin/views');
app.set("view engine", "ejs");
app.set("port", 3030);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(validator());
app.use(layout);

app.use(session({
    secret: "123456789",
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    resave:false,
    saveUninitialized:true,
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.admin = req.session.admin || false;
    res.locals.message = req.flash();
    res.locals.moment = moment;
    next();
});

import mainrouter from "./admin/main.router/admin.router.js"
import crud from "./admin/main.router/admin.crud.router.js"
import accessrouter from "./admin/main.router/admin.access.js";

app.use(accessrouter)
app.use(crud)
app.use(mainrouter)
app.use((req, res)=>{
    res.status(404).sendFile(__dirname + '/public/404.html');
})
app.listen(app.get('port'), () => {
    console.info(`Server is running on PORT: ${app.get('port')}`);
});







