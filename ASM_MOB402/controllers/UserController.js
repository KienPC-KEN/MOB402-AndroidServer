const mongoose = require('mongoose');
const userModel = require('../model/userModel');
const uri = "mongodb+srv://kienpcph23267:OjRVIQlQn7jRaXK1@pckvirus.qwdni7w.mongodb.net/cp17305?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Kết nối DB thành công");

//Layout listUser
exports.listUsers = async (req, res) => {

    let arrUser = await userModel.find().lean();
    res.render('user/listUser',
        {
            layout: 'mainUser',
            arr: arrUser,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq,
        });
}
//Layout addUser
exports.layoutAddUsers = async (req, res) => {

    res.render('user/addUser',
        {
            layout: 'mainUser',
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq

        });
}
//Sự kiện xử lý addUser
exports.addUsers = async (req, res) => {

    let arrUser = await userModel.find();
    const { name, email, pass, rePass, selectPQUser } = req.body;
    const file = req.file.path;
    const avatar = "http://localhost:3000/" + file;
    var newStt = arrUser[arrUser.length - 1].stt + 1;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let objUser = { stt: newStt, name: name, email: email, password: pass, avatar: avatar, pq: selectPQUser };

    let check;
    if (!email || !pass || !rePass || !avatar || !name || !selectPQUser) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {
        let kq = await userModel.insertMany(objUser);
        console.log(kq);
        res.redirect('/user/');
        return;
    }
    res.render('user/addUser', {
        layout: 'mainUser',
        check: check,
        avatar: req.session.userLogin.avatar,
        name: req.session.userLogin.name,
        pq: req.session.userLogin.pq
    });
}

//Layout updateUser
exports.layoutUpdateUsers = async (req, res) => {
    //kết nối DB và lấy mảng
    let arrUser = await userModel.find({ _id: idUserEdit }).lean();

    console.log(arrUser);
    res.render('user/updateUser',
        {
            layout: 'mainUser',
            arr: arrUser,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}
//Sự kiện updateUser
exports.updateUsers = async (req, res) => {
    const { name, email, pass, rePass, selectPQUser } = req.body;
    const file = req.file.path;
    const avatar = "http://localhost:3000/" + file;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let objNewUser = { name: name, email: email, password: pass, avatar: avatar, pq: selectPQUser };
    console.log(req.body);
    let check;
    if (!email || !pass || !rePass || !file || !name || !selectPQUser) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {
        if (idUserEdit == req.session.userLogin._id) {
            let kq = await userModel.updateOne({ _id: idUserEdit }, objNewUser);
            res.redirect('/auth/');
            console.log(kq);
            return;
        } else {
            let kq = await userModel.updateOne({ _id: idUserEdit }, objNewUser);
            res.redirect('/user/');
            console.log(kq);
            return;
        }

    }
    res.render('user/updateUser', {
        layout: 'mainUser',
        check: check,
        avatar: req.session.userLogin.avatar,
        name: req.session.userLogin.name,
        pq: req.session.userLogin.pq
    });
}

// Lấy id User
var idUserEdit, idUserDetail;
exports.getIdEditUsers = (req, res) => {

    const id = req.body.id;
    idUserEdit = id;
    console.log("Lấy id user: " + id);
    res.redirect('/user/updateUser');
    return;
}
//Sự kiện deleteUser
exports.deleteUsers = async (req, res) => {
    const id = req.body.id;

    if (id == req.session.userLogin._id) {
        await userModel.deleteOne({ _id: id });
        console.log("Xóa thành công");

        res.redirect('/auth/');
        return;
    } else {
        await userModel.deleteOne({ _id: id });
        console.log("Xóa thành công");

        res.redirect('/user/');
        return;
    }

}
//Sự kiện xem thông tin User
exports.getIdDetailUsers = (req, res) => {
    const id = req.body.id;
    idUserDetail = id;
    console.log("Lấy id user: " + id);
    res.redirect('/user/detailUser');
    return;
}
//Layout deltail User
exports.layoutDetailUsers = async (req, res) => {

    let arrUser = await userModel.find({ _id: idUserDetail }).lean();

    res.render('user/detailUser',
        {
            layout: 'mainUser',
            arr: arrUser,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}

exports.deltailUserLog = async (req, res) => {
    let arrUser = await userModel.find({ _id: req.session.userLogin._id }).lean();

    res.render('userLog/detailUser',
        {
            layout: 'mainUser',
            arr: arrUser,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}

exports.updateUserLog = async (req, res) => {
    let arrUser = await userModel.find({ _id: req.session.userLogin._id }).lean();
    const { name, email, pass, rePass, avatar, selectPQUser } = req.body;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let objNewUser = { name: name, email: email, password: pass, avatar: avatar, pq: selectPQUser };
    console.log(req.body);
    let check;
    if (!email || !pass || !rePass || !avatar || !name || !selectPQUser) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {
        let kq = await userModel.updateOne({ _id: req.session.userLogin._id }, objNewUser);
        if (req.session != null)
            req.session.destroy(function () {
                console.log("Đăng xuất thành công")
                res.redirect('/auth/');
            });
        console.log(kq);
        return;
    }
    res.render('userLog/updateUser',
        {
            layout: 'mainUser',
            arr: arrUser,
            check: check,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        });
}

exports.Logout = (req, res, next) => {
    if (req.session != null)
        req.session.destroy(function () {
            console.log("Đăng xuất thành công")
            res.redirect('/auth/');
        });
}

exports.searchLoai = async (req, res) => {
    const searchLoai = req.body.searchLoai;
    const searchString = req.body.search;

    if (searchLoai != "") {
        let arrSearchLoai = await userModel.find({ pq: searchLoai }).lean();
        res.render('user/listUser', {
            layout: 'mainUser',
            arr: arrSearchLoai,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        })

    } else if (searchString != "") {
        let arrSearch = await userModel.find({ name: searchString }).lean();
        res.render('user/listUser', {
            layout: 'mainUser',
            arr: arrSearch,
            avatar: req.session.userLogin.avatar,
            name: req.session.userLogin.name,
            pq: req.session.userLogin.pq
        })
    } else {
        res.redirect('/user/');
    }

};