const express = require('express')
const expressHbs = require('express-handlebars');
const app = express();
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.engine('.hbs', expressHbs.engine({ extname: "hbs", defaultLayout: "login", layoutsDir: "views/layouts/" }));

app.set('view engine', '.hbs');
app.set('views', './views');
//Trang đăng nhập
app.get('/', (req, res) => {
    res.render('mainHome',
        {
            layout: 'login'
        });
});

//Trang Đăng ký
app.get('/dangKy', (req, res) => {
    res.render('mainHome',
        {
            layout: 'regist',

        });
});
//Trang chủ
var image, name, _id, _email, _pass;
app.get('/home', (req, res) => {

    res.render('mainHome',
        {
            layout: 'home',
            image: image,
            name: name,
            arr: arrProduct,
        });

});
//Trang danh sách user
app.get('/listUser', (req, res) => {
    res.render('mainHome',
        {
            layout: 'listUser',
            arr: arrUser,
            _name: name,
            _image: image,
        });
});
//Trang thêm sản phẩm
app.get('/addProduct', (req, res) => {
    res.render('mainHome',
        {
            layout: 'addProduct',
            _name: name,
            _image: image,
        });
});
//Trang sửa sản phẩm
app.get('/updateProduct', (req, res) => {
    var result = arrProduct.filter(function (product) {
        return product.id == idProductEdit;
    });

    res.render('mainHome',
        {
            layout: 'updateProduct',
            _name: name,
            _image: image,
            arr: result

        });
});
//Trang thông tin sản phẩm
app.get('/detailProduct', (req, res) => {
    var result = arrProduct.filter(function (product) {
        return product.id == idProductDetail;
    });
    res.render('mainHome',
        {
            layout: 'detailProduct',
            arr: result

        });
});
//Trang thông tin người dùng
app.get('/detailUser', (req, res) => {
    var result = arrUser.filter(function (user) {
        return user.id == idUserDetail;
    });

    res.render('mainHome',
        {
            layout: 'detailUser',
            arr: result
            
        });
});
//Trang sửa người dùng
app.get('/updateUser', (req, res) => {
    var result = arrUser.filter(function (user) {
        return user.id == idUserEdit;
    });

    res.render('mainHome',
        {
            layout: 'updateUser',
            _id: _id,
            _name: name,
            arr: result
        });
});

//Mảng user
let arrUser = new Array();
arrUser.push({ id: 1, name: 'Admin Đẹp Trai', email: 'admin@gmail.com', pass: 123, img: 'http://localhost:3000/images/avatar_1.png' },
    { id: 2, name: 'Phùng Chí Kiên', email: 'kien@gmail.com', pass: 123, img: 'http://localhost:3000/images/img.png' })

//Mảng product
let arrProduct = new Array();
arrProduct.push({ id: 1, maSP: 'PH23', tenSP: "Quần jean", donGia: 150000, imgP: 'http://localhost:3000/images/avatar_1.png', mauSac: "Đen" },
    { id: 2, maSP: 'PH42', tenSP: "Áo thun", donGia: 120000, imgP: 'http://localhost:3000/images/avatar_1.png', mauSac: "Hồng" })

//Sự kiện login
app.post('/login', (req, res) => {
    const { email, pass } = req.body;

    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    console.log(req.body);
    let check;
    for (let index = 0; index < arrUser.length; index++) {
        const element = arrUser[index];
        if (!email || !pass) {
            // Nếu email hoặc pass rỗng thì thực hiện hành động này
            check = "Chưa đủ thông tin";
        } else if (email != element.email || pass != element.pass) {
            check = "Nhập Sai email hoặc password";
        } else if (!emailRegex.test(email)) {
            check = "Email chưa đúng định dạng";
        } else {
            res.redirect('/home');
            image = element.img;
            name = element.name;
            _id = element.id;
            _email = element.email;
            _pass = element.pass;
            return;
        }
    }

    res.render('mainHome', {
        layout: 'login',
        check: check
    });
})

//PHẦN PRODUCT
var idProductEdit, idProductDelete, idProductDetail;
// Lấy id product
app.post('/home/getIdEditP', (req, res) => {
    const id = req.body.id;
    idProductEdit = id;
    res.redirect('/updateProduct');
    return;
})
app.post('/home/getIdDeleteP', (req, res) => {
    const id = req.body.id;
    idProductDelete = id - 1;
    arrProduct.splice(idProductDelete, 1);
    res.redirect('/home');
    return;
})
app.post('/home/getIdDetailP', (req, res) => {
    const id = req.body.id;
    idProductDetail = id;
    res.redirect('/detailProduct');
    return;
})
//Sự kiện thêm sản phẩm
app.post('/addProduct', (req, res) => {
    const { maSP, tenSP, donGia, imgP, mauSac } = req.body;
    var newId = arrProduct[arrProduct.length - 1].id + 1;
    let objProduct = { id: newId, maSP: maSP, tenSP: tenSP, donGia: donGia, imgP: imgP, mauSac: mauSac };
    let check;
    if (!maSP || !tenSP || !donGia || !imgP || !mauSac) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (isNaN(donGia)) {
        check = "Đơn giá phải là số";
    }
    else {
        arrProduct.push(objProduct);
        res.redirect('/home');
        console.log(objProduct);

        return;
    }
    res.render('mainHome', {
        layout: 'addProduct',
        check: check,
    });
})
//Sự kiện sửa sản phẩm
app.post('/updateProduct', (req, res) => {
    const { maSP, tenSP, donGia, imgP, mauSac } = req.body;
    let objNewProduct = { id: idProductEdit, maSP: maSP, tenSP: tenSP, donGia: donGia, imgP: imgP, mauSac: mauSac };
    let check;
    if (!maSP || !tenSP || !donGia || !imgP || !mauSac) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (isNaN(donGia)) {
        check = "Đơn giá phải là số";
    }
    else {
        arrProduct.splice(idProductEdit - 1, 1, objNewProduct);
        res.redirect('/home');
        console.log(objNewProduct);
        return;
    }
    res.render('mainHome', {
        layout: 'updateProduct',
        check: check,
    });
})

//PHẦN USER
var idUserEdit, idUserDelete, idUserDetail;
// Lấy id user
app.post('/listUser/getIdEdit', (req, res) => {
    const id = req.body.id;
    idUserEdit = id;
    res.redirect('/updateUser');
    return;
})
app.post('/listUser/getIdDelete', (req, res) => {
    const id = req.body.id;
    idUserDelete = id - 1;
    arrUser.splice(idUserDelete, 1);
    res.redirect('/listUser');
    return;
})
app.post('/listUser/getIdDetail', (req, res) => {
    const id = req.body.id;
    idUserDetail = id;
    res.redirect('/detailUser');
    return;
})
//Sự kiện thêm user
app.post('/dangKy', (req, res) => {
    const { name, email, pass, rePass, avatar } = req.body;
    var newId = arrUser[arrUser.length - 1].id + 1;
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let objUser = { id: newId, name: name, email: email, pass: pass, rePass: rePass, img: avatar };
    console.log(req.body);
    let check;
    if (!email || !pass || !rePass || !avatar || !name) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {
        arrUser.push(objUser);
        res.redirect('/');
        console.log(arrUser);

        return;
    }
    res.render('mainHome', {
        layout: 'regist',
        check: check,
    });
})
//Sự kiện sửa user
app.post('/updateUser', (req, res) => {
    const { name, email, pass, rePass, avatar } = req.body;
    console.log(req.body);
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    let objNewUser = { id: idUserEdit, name: name, email: email, pass: pass, rePass: rePass, img: avatar };
    let check;
    if (!email || !pass || !rePass || !avatar || !name) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {
        arrUser.splice(idUserEdit - 1, 1, objNewUser);
        res.redirect('/listUser');
        return;
    }
    res.render('mainHome', {
        layout: 'updateUser',
        check: check,
    });
})
