const mongoose = require('mongoose')
const express = require("express");
const expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const btModel = require('./baithoModel');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "index", layoutsDir: "views/layouts/" }));

app.set('view engine', '.hbs');
app.set('views', './views');

const uri = "mongodb+srv://kienpcph23267:OjRVIQlQn7jRaXK1@pckvirus.qwdni7w.mongodb.net/cp17305?retryWrites=true&w=majority";

app.get('/add', async (req, res) => {
    res.render('home', {
        layout: 'index',
    });
})
app.get('/', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

    let listThos = await btModel.find();
    res.render('home', {
        layout: 'list',
        arr: listThos.map(listThos => listThos.toJSON()),
    });
})
app.get('/update', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

    var result = await btModel.find({ tieude: nameEdit });
    res.render('home', {
        layout: 'update',
        arr: result.map(result => result.toJSON()),
    });
})
var nameEdit, nameDelete;
app.post('/list/getIdEdit', (req, res) => {
    const name = req.body.name;
    console.log(name);
    nameEdit = name;
    res.redirect('/update');
    return;
});
app.post('/list/getIdDelete', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    const name = req.body.name;
    console.log(name);
    nameDelete = name;
    btModel.deleteOne({ tieude: nameDelete })
        .then(function () {
            console.log("Document deleted");
            return;
        })
        .catch(function (err) {
            console.log(err);
        });
    res.redirect('/');
    return;
});

app.post('/add', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

    const { txtTieuDe, txtNam, txtTacGia } = req.body;
    console.log(req.body);

    const baiTho = new btModel({
        tieude: txtTieuDe,
        nam: txtNam,
        tacgia: txtTacGia,
    });
    let kq = await baiTho.save();
    console.log(kq);
    res.redirect('/');
    res.render('home', {
        layout: 'index',
    });
})
app.post('/update', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

    const { txtTieuDe, txtNam, txtTacGia } = req.body;
    console.log(req.body);
    console.log("Điều kiện update: " + nameEdit);
    let update = await btModel.updateOne({ tieude: nameEdit },
        { tieude: txtTieuDe, nam: txtNam, tacgia: txtTacGia })
    console.log(update);
    res.redirect('/');
    return;
})