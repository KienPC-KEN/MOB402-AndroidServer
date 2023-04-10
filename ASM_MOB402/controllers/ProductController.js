const mongoose = require('mongoose');
const productModel = require('../model/productModel');
const uri = "mongodb+srv://kienpcph23267:OjRVIQlQn7jRaXK1@pckvirus.qwdni7w.mongodb.net/cp17305?retryWrites=true&w=majority";
mongoose.connect(uri);
console.log("Kết nối DB thành công");

//Layout listProdcut
exports.listProducts = async (req, res) => {


    let arrProduct = await productModel.find().lean();
    res.render('product/listProduct',
        {
            layout: 'mainProduct',
            arr: arrProduct,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}
//Layout addProduct
exports.layoutAddProducts = async (req, res) => {

    res.render('product/addProduct',
        {
            layout: 'mainProduct',
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}
//Sự kiện xử lý addProduct
exports.addProducts = async (req, res) => {

    let arrProduct = await productModel.find().lean();
    const { maSP, tenSP, donGia, mauSac, selectLoaiSP } = req.body;
    const file = req.file.path;
    const imgP = "http://localhost:3000/" + file;
    var newStt = arrProduct[arrProduct.length - 1].stt + 1;
    let objProduct = { stt: newStt, masp: maSP, tensp: tenSP, dongia: donGia, hinhanh: imgP, mausac: mauSac, loaisp: selectLoaiSP };
    let check;
    if (!maSP || !tenSP || !donGia || !imgP || !mauSac || !selectLoaiSP) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (isNaN(donGia)) {
        check = "Đơn giá phải là số";
    }
    else {
        let kq = await productModel.insertMany(objProduct);
        res.redirect('/product/');
        console.log(kq);
        return;
    }
    res.render('product/addProduct', {
        layout: 'mainProduct',
        check: check,
        avatar: req.session.userLogin.avatar,
        name: req.session.userLogin.name,
        pq: req.session.userLogin.pq
    });
}

//Layout updateProduct
exports.layoutUpdateProducts = async (req, res) => {

    let arrProduct = await productModel.find({ _id: idProductEdit }).lean();

    console.log(arrProduct);
    res.render('product/updateProduct',
        {
            layout: 'mainProduct',
            arr: arrProduct,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}
//Sự kiện updateProdcut
exports.updateProducts = async (req, res) => {

    const { maSP, tenSP, donGia, mauSac, selectLoaiSP } = req.body;
    const file = req.file.path;
    const imgP = "http://localhost:3000/" + file;

    let objNewProduct = { masp: maSP, tensp: tenSP, dongia: donGia, hinhanh: imgP, mausac: mauSac, loaisp: selectLoaiSP };
    let check;
    if (!maSP || !tenSP || !donGia || !imgP || !mauSac || !selectLoaiSP) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (isNaN(donGia)) {
        check = "Đơn giá phải là số";
    }
    else {
        await productModel.updateOne({ _id: idProductEdit }, objNewProduct)
        res.redirect('/product/');
        console.log(objNewProduct);
        return;
    }
    res.render('product/updateProduct', {
        layout: 'mainProduct',
        check: check,
        avatar: req.session.userLogin.avatar,
        name: req.session.userLogin.name,
        pq: req.session.userLogin.pq
    });
}

// Lấy id product
var idProductEdit, idProductDetail;
exports.getIdEditProducts = (req, res) => {

    const id = req.body.id;
    idProductEdit = id;
    console.log("Lấy id product: " + id);
    res.redirect('/product/updateProduct');
    return;
}
//Sự kiện delete product
exports.deleteProducts = async (req, res) => {
    const id = req.body.id;

    await productModel.deleteOne({ _id: id });
    console.log("Xóa thành công");

    res.redirect('/product/');
    return;
}
//Sự kiện xem thông tin product
exports.getIdDetailProducts = (req, res) => {
    const id = req.body.id;
    idProductDetail = id;
    console.log("Lấy id product: " + id);
    res.redirect('/product/detailProduct');
    return;
}
//Layout deltail product
exports.layoutDetailProducts = async (req, res) => {

    let arrProduct = await productModel.find({ _id: idProductDetail }).lean();

    res.render('product/detailProduct',
        {
            layout: 'mainProduct',
            arr: arrProduct,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}

exports.searchLoai = async (req, res) => {
    const searchLoai = req.body.searchLoai;
    const searchString = req.body.search;

    if (searchLoai != "") {
        let arrSearchLoai = await productModel.find({ loaisp: searchLoai }).lean();
        res.render('product/listProduct', {
            layout: 'mainProduct',
            arr: arrSearchLoai,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        })

    } else if (searchString != "") {
        let arrSearch = await productModel.find({ tensp: searchString }).lean();
        res.render('product/listProduct', {
            layout: 'mainProduct',
            arr: arrSearch,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        })
    } else {
        res.redirect('/product/');
    }

};


