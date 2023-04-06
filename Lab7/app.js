require('dotenv').config();
//var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
var config = require('./config/database');

const authRoute = require('./routes/authRoute');
const bookRoute = require('./routes/bookRoute');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });
//sesion user
app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: process.env.KEY_SESSION, // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRoute);
app.use('/book', bookRoute);


app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "login", layoutsDir: "views/layouts" }));

app.set('view engine', '.hbs');
app.set('views', './views');



//Trang đăng nhập
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main',
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('404 - Khong tim thay trang')
    next();
});

module.exports = app;

const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});