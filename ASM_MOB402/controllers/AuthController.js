const mongoose = require('mongoose');
const userModel = require('../model/userModel');
const uri = "mongodb+srv://kienpcph23267:OjRVIQlQn7jRaXK1@pckvirus.qwdni7w.mongodb.net/cp17305?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');


//Hiển thị layout login
exports.layoutLogin = async (req, res) => {

    res.render('auth/login', {
        layout: "mainAuth",
    });
};
//Xử lý sự kiện login
exports.login = async (req, res) => {
    await mongoose.connect(uri).
        then(console.log('Kết nối DB thành công'));
    const { email, pass } = req.body;
    let arrUser = await userModel.findOne({ email: email });


    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(req.body);
    let check;
    try {
        if (!email || !pass) {
            // Nếu email hoặc pass rỗng thì thực hiện hành động này
            check = "Chưa đủ thông tin";
        } else if (email != arrUser.email || pass != arrUser.password) {
            check = "Nhập Sai email hoặc password";
        } else if (!emailRegex.test(email)) {
            check = "Email chưa đúng định dạng";
        }
        else {
            //Lưu vào session
            req.session.userLogin = arrUser;
            console.log("Đăng nhập thành công");
            res.redirect('/product/');
            return;
        }
    } catch (error) {
        check = error.message;
    }
    res.render('auth/login', {
        layout: 'mainAuth',
        check: check
    });

}


//Hiển thị layout sign up
exports.layoutSignUp = (req, res) => {
    res.render('auth/regist',
        {
            layout: 'mainAuth',
        });
}
//Xử lý sự kiện sign up
exports.signUp = async (req, res) => {
    await mongoose.connect(uri).
        then(console.log('Kết nối DB thành công'));
    let arrUser = await userModel.find();
    const { name, email, pass, rePass, selectPQUser } = req.body;
    const file = req.file.path;
    const avatar = "http://localhost:3000/" + file;
    console.log(avatar);
    // const avatar = req.file;
    var newStt = arrUser[arrUser.length - 1].stt + 1;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let objUser = { stt: newStt, name: name, email: email, password: pass, avatar: avatar, pq: selectPQUser };
    console.log(req.body);
    let check;
    if (!email || !pass || !rePass || !name || !selectPQUser) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    } else if (!emailRegex.test(email)) {
        check = "Email chưa đúng định dạng";
    }
    else {

        // const saltRounds = 10;
        // const hashPass = await bcrypt.hash(pass, saltRounds);
        // objUser.password = hashPass;

        // console.log("mã hóa pass: " + hashPass);

        await userModel.insertMany(objUser);
        res.redirect('/auth/');
        console.log(arrUser);
        return;
    }
    res.render('auth/regist', {
        layout: 'mainAuth',
        check: check,
    });

}