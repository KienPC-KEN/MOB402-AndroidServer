require('dotenv').config();

const express = require('express')
var session = require('express-session');
const expressHbs = require('express-handlebars');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const authRoutes = require('./route/AuthRoute');
const userRoutes = require('./route/UserRoute');
const productRoutes = require('./route/ProductRoute');

app.use(bodyParser.urlencoded({ extended: true }));

//Còn phần user mới hoàn thiện phần list user

app.use(express.static('public'));
app.use('/images', express.static('images'));

//sesion user
app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: process.env.KEY_SESSION, // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
    resave: false,
    saveUninitialized: false
}));

//sử dụng controllers
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "login", layoutsDir: "views/" }));

app.set('view engine', '.hbs');
app.set('views', './views/layouts');
//Trang đăng nhập
app.get('/', (req, res) => {
    res.render('auth/login',
        {
            layout: 'mainAuth',
        });
});

//Trang danh sách user
// app.get('/listUser', (req, res) => {
//     res.render('mainHome',
//         {
//             layout: 'user/listUser',
//             arr: arrUser,
//             _name: name,
//             _image: image,
//         });
// });
//Trang thêm sản phẩm
// app.get('/addProduct', (req, res) => {
//     res.render('mainHome',
//         {
//             layout: 'product/addProduct',
//             _name: name,
//             _image: image,
//         });
// });
//Trang sửa sản phẩm
// app.get('/updateProduct', (req, res) => {
//     var result = arrProduct.filter(function (product) {
//         return product.id == idProductEdit;
//     });

//     res.render('mainHome',
//         {
//             layout: 'product/updateProduct',
//             _name: name,
//             _image: image,
//             arr: result

//         });
// });
//Trang thông tin sản phẩm
// app.get('/detailProduct', (req, res) => {
//     var result = arrProduct.filter(function (product) {
//         return product.id == idProductDetail;
//     });
//     res.render('mainHome',
//         {
//             layout: 'product/detailProduct',
//             arr: result

//         });
// });
//Trang thông tin người dùng
// app.get('/detailUser', (req, res) => {
//     var result = arrUser.filter(function (user) {
//         return user.id == idUserDetail;
//     });

//     res.render('mainHome',
//         {
//             layout: 'user/detailUser',
//             arr: result

//         });
// });
//Trang sửa người dùng
// app.get('/updateUser', (req, res) => {
//     var result = arrUser.filter(function (user) {
//         return user.id == idUserEdit;
//     });

//     res.render('mainHome',
//         {
//             layout: 'user/updateUser',
//             _id: _id,
//             _name: name,
//             arr: result
//         });
// });

//Sự kiện login
// app.post('/login', (req, res) => {
//     const { email, pass } = req.body;

//     var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
//     console.log(req.body);
//     let check;
//     for (let index = 0; index < arrUser.length; index++) {
//         const element = arrUser[index];
//         if (!email || !pass) {
//             // Nếu email hoặc pass rỗng thì thực hiện hành động này
//             check = "Chưa đủ thông tin";
//         } else if (email != element.email || pass != element.pass) {
//             check = "Nhập Sai email hoặc password";
//         } else if (!emailRegex.test(email)) {
//             check = "Email chưa đúng định dạng";
//         } else {
//             res.redirect('/home');
//             image = element.img;
//             name = element.name;
//             _id = element.id;
//             _email = element.email;
//             _pass = element.pass;
//             return;
//         }
//     }
//     res.render('mainHome', {
//         layout: 'auth/login',
//         check: check
//     });
// })

//PHẦN PRODUCT
// var idProductEdit, idProductDelete, idProductDetail;
// Lấy id product
// app.post('/product/getIdEditP', (req, res) => {
//     const id = req.body.id;
//     idProductEdit = id;
//     console.log(id);
//     res.redirect('/product/updateProduct');
//     return;
// })
// app.post('/home/getIdDeleteP', (req, res) => {
//     const id = req.body.id;
//     idProductDelete = id - 1;
//     arrProduct.splice(idProductDelete, 1);
//     res.redirect('/home');
//     return;
// })
// app.post('/getIdDetailP', (req, res) => {
//     const id = req.body.id;
//     idProductDetail = id;
//     res.redirect('/detailProduct');
//     return;
// })
//Sự kiện thêm sản phẩm
// app.post('/addProduct', (req, res) => {
//     const { maSP, tenSP, donGia, imgP, mauSac } = req.body;
//     var newId = arrProduct[arrProduct.length - 1].id + 1;
//     let objProduct = { id: newId, maSP: maSP, tenSP: tenSP, donGia: donGia, imgP: imgP, mauSac: mauSac };
//     let check;
//     if (!maSP || !tenSP || !donGia || !imgP || !mauSac) {
//         // Nếu email hoặc pass rỗng thì thực hiện hành động này
//         check = "Chưa đủ thông tin";
//     } else if (isNaN(donGia)) {
//         check = "Đơn giá phải là số";
//     }
//     else {
//         arrProduct.push(objProduct);
//         res.redirect('/home');
//         console.log(objProduct);
//         return;
//     }
//     res.render('mainHome', {
//         layout: 'addProduct',
//         check: check,
//     });
// })
//Sự kiện sửa sản phẩm
// app.post('/updateProduct', (req, res) => {
//     const { maSP, tenSP, donGia, imgP, mauSac } = req.body;
//     let objNewProduct = { id: idProductEdit, maSP: maSP, tenSP: tenSP, donGia: donGia, imgP: imgP, mauSac: mauSac };
//     let check;
//     if (!maSP || !tenSP || !donGia || !imgP || !mauSac) {
//         // Nếu email hoặc pass rỗng thì thực hiện hành động này
//         check = "Chưa đủ thông tin";
//     } else if (isNaN(donGia)) {
//         check = "Đơn giá phải là số";
//     }
//     else {
//         arrProduct.splice(idProductEdit - 1, 1, objNewProduct);
//         res.redirect('/home');
//         console.log(objNewProduct);
//         return;
//     }
//     res.render('mainHome', {
//         layout: 'updateProduct',
//         check: check,
//     });
// })

//PHẦN USER
// var idUserEdit, idUserDelete, idUserDetail;
// Lấy id user
// app.post('/listUser/getIdEdit', (req, res) => {
//     const id = req.body.id;
//     idUserEdit = id;
//     res.redirect('/updateUser');
//     return;
// })
// app.post('/listUser/getIdDelete', (req, res) => {
//     const id = req.body.id;
//     idUserDelete = id - 1;
//     arrUser.splice(idUserDelete, 1);
//     res.redirect('/listUser');
//     return;
// })
// app.post('/listUser/getIdDetail', (req, res) => {
//     const id = req.body.id;
//     idUserDetail = id;
//     res.redirect('/detailUser');
//     return;
// })
//Sự kiện thêm user
// app.post('/dangKy', (req, res) => {
//     const { name, email, pass, rePass, avatar } = req.body;
//     var newId = arrUser[arrUser.length - 1].id + 1;
//     var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
//     let objUser = { id: newId, name: name, email: email, pass: pass, rePass: rePass, img: avatar };
//     console.log(req.body);
//     let check;
//     if (!email || !pass || !rePass || !avatar || !name) {
//         // Nếu email hoặc pass rỗng thì thực hiện hành động này
//         check = "Chưa đủ thông tin";
//     } else if (rePass != pass) {
//         check = "Nhập lại mật khẩu không đúng";
//     } else if (!emailRegex.test(email)) {
//         check = "Email chưa đúng định dạng";
//     }
//     else {
//         arrUser.push(objUser);
//         res.redirect('/');
//         console.log(arrUser);

//         return;
//     }
//     res.render('mainHome', {
//         layout: 'regist',
//         check: check,
//     });
// })
//Sự kiện sửa user
// app.post('/updateUser', (req, res) => {
//     const { name, email, pass, rePass, avatar } = req.body;
//     console.log(req.body);
//     var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
//     let objNewUser = { id: idUserEdit, name: name, email: email, pass: pass, rePass: rePass, img: avatar };
//     let check;
//     if (!email || !pass || !rePass || !avatar || !name) {
//         // Nếu email hoặc pass rỗng thì thực hiện hành động này
//         check = "Chưa đủ thông tin";
//     } else if (rePass != pass ) {
//         check = "Nhập lại mật khẩu không đúng";
//     } else if (!emailRegex.test(email)) {
//         check = "Email chưa đúng định dạng";
//     }
//     else {
//         arrUser.splice(idUserEdit - 1, 1, objNewUser);
//         res.redirect('/listUser');
//         return;
//     }
//     res.render('mainHome', {
//         layout: 'user/updateUser',
//         check: check,
//     });
// })
