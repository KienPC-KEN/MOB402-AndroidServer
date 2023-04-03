const mongoose = require('mongoose')
const express = require("express");
const expressHbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const btModel = require('./baithoModel');
const { parse } = require('path');

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

    var result = await btModel.find({ _id: idEdit });
    res.render('home', {
        layout: 'update',
        arr: result.map(result => result.toJSON()),
    });
})
var idEdit, idDelete;
app.post('/list/getIdEdit', (req, res) => {
    const id = req.body.id;
    console.log(id);
    idEdit = id;
    res.redirect('/update');
    return;
});
app.post('/list/getIdDelete', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    const id = req.body.id;
    idDelete = id;
    console.log("id lấy: " + idDelete);
    await btModel.deleteOne({ _id: idDelete })
        .then(function () {
            console.log("Document deleted");
            res.redirect('/');
            return;
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.post('/add', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));
    let objBT = await btModel.find().lean();
   
    const { txtTieuDe, txtNam, txtTacGia } = req.body;
    console.log(req.body);
    const result =  objBT[objBT.length - 1].id + 1;
    const baiTho = new btModel({
        id: result,
        tieude: txtTieuDe,
        nam: txtNam,
        tacgia: txtTacGia,
    });
    let kq = await baiTho.save();
    console.log(kq);
    res.redirect('/');
    return;

})
app.post('/update', async (req, res) => {
    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

    const { txtTieuDe, txtNam, txtTacGia } = req.body;
    console.log(req.body);
    console.log("Điều kiện update: " + idEdit);
    let update = await btModel.updateOne({ _id: idEdit },
        { tieude: txtTieuDe, nam: txtNam, tacgia: txtTacGia })
    console.log(update);
    res.redirect('/');
    return;
})