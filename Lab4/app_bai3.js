const express = require('express')

//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

const app = express()

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "index2", layoutsDir: "views/layouts/" }));

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})