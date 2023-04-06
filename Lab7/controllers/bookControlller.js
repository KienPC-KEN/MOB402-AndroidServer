const bookModel = require('../models/book');

//Layout listBook
exports.listBook = async (req, res) => {


    let arrBook = await bookModel.find().lean();
    res.render('list',
        {
            layout: 'main',
            arr: arrBook,
            username: req.session.userLogin.username,
            password: req.session.userLogin.password
        });
}

exports.layoutAddBook = async (req, res) => {

    res.render('addBook',
        {
            layout: 'main',
            username: req.session.userLogin.username,
            password: req.session.userLogin.password
        });
}
exports.addBook = async (req, res) => {

    let arrBook = await bookModel.find().lean();

    const { isbn, title, author, publisher } = req.body;

    let objBook = { isbn: isbn, title: title, author: author, publisher: publisher }
    let check;
    if (!isbn || !title || !author || !publisher) {
        // Nếu email hoặc pass rỗng thì thực hiện hành động này
        check = "Chưa đủ thông tin";
    }
    else {
        let kq = await bookModel.insertMany(objBook);
        res.redirect('/book/');
        console.log(kq);
        return;
    }
    res.render('list',
        {
            layout: 'main',
            arr: arrBook,
            username: req.session.userLogin.username,
            password: req.session.userLogin.password
        });
}

exports.Logout = (req, res, next) => {
    if (req.session != null)
        req.session.destroy(function () {
            console.log("Đăng xuất thành công")
            res.redirect('/auth/');
        });
}