const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController')
const mdw = require('../middelware/usermid');
const mdw_pq = require('../middelware/checkRole');
const multer = require('multer');
const fs = require("fs");

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = "./images"
        //Nếu chưa có thư mục đó thì tạo nó ra
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, 'images')
    },
    filename: function (req, file, cb) {

        var tenGoc = file.originalname;
        console.log(tenGoc);
        arr = tenGoc.split('.');

        let newFileName = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                newFileName += arr[i]
            } else {
                newFileName += ('-' + Date.now() + '.' + arr[i])
            }

        }

        cb(null, newFileName)
    }
})

var upload = multer({ storage: storage })

router.use((req, res, next) => {
    console.log('đi qua midderware');
    next();
});

router.get('/', mdw.check_login, mdw_pq.check_role, userController.listUsers);

router.get('/addUser', mdw.check_login, userController.layoutAddUsers);
router.post('/addUser', upload.single('myImage'), mdw.check_login, userController.addUsers);

router.get('/updateUser', mdw.check_login, userController.layoutUpdateUsers);
router.post('/updateUser', upload.single('myImage'), mdw.check_login, userController.updateUsers);

router.post('/getIdEditU', mdw.check_login, userController.getIdEditUsers);

router.get('/detailUser', mdw.check_login, userController.layoutDetailUsers);

router.post('/getIdDetailU', mdw.check_login, userController.getIdDetailUsers);

router.post('/deleteUser', mdw.check_login, userController.deleteUsers);

router.get('/deltailUserLog', mdw.check_login, userController.deltailUserLog);

router.get('/updateUserLog', mdw.check_login, userController.updateUserLog);
router.post('/updateUserLog', mdw.check_login, userController.updateUserLog);

router.get('/logout', mdw.check_login, userController.Logout);

router.get('/search', mdw.check_login, userController.searchLoai);
router.post('/search', mdw.check_login, userController.searchLoai);
module.exports = router;