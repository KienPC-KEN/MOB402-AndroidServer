const express = require('express');
const router = express.Router();
const authRoute = require('../controllers/AuthController');

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

router.get('/', authRoute.layoutLogin);
router.post('/login', authRoute.login);

router.get('/dangKy', authRoute.layoutSignUp);
router.post('/dangKy', upload.single('myImage'), authRoute.signUp);



module.exports = router;