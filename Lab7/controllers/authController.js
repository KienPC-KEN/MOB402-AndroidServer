const authModel = require('../models/user');

//Hiển thị layout login
exports.layoutLogin = async (req, res) => {

    res.render('login', {
        layout: 'main',
    })
};
//Xử lý sự kiện login
exports.login = async (req, res) => {
    let arrUser = await authModel.find();
    const { email, pass } = req.body;


    let check;
    arrUser.forEach(element => {
        if (!email || !pass) {
            // Nếu email hoặc pass rỗng thì thực hiện hành động này
            check = "Chưa đủ thông tin";
        } else if (email != element.username || pass != element.password) {
            check = "Nhập Sai email hoặc password";
        } else {
            //Lưu vào session
            req.session.userLogin = element;
            console.log(element);
            res.redirect('/book/');
            return;
        }
    });
    res.render('login', {
        layout: 'main',
        check: check
    });

}


//Hiển thị layout sign up
exports.layoutSignUp = (req, res) => {
    res.render('regist', {
        layout: 'main',
    });
}
//Xử lý sự kiện sign up
exports.signUp = async (req, res) => {
    let arrUser = await authModel.find();
    const { name, pass, rePass, } = req.body;
    let objUser = { username: name, password: pass,};
    console.log(req.body);
    let check;
    if ( !pass || !rePass || !name ) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    } else if (rePass != pass) {
        check = "Nhập lại mật khẩu không đúng";
    }
    else {
        authModel.insertMany(objUser);
        res.redirect('/auth/');
        console.log(arrUser);
        return;
    }
    res.render('regist', {
        layout: 'main',
        check: check,
    });

}