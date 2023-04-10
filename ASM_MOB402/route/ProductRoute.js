const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const mdw = require('../middelware/usermid');
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

router.get('/', mdw.check_login, productController.listProducts);

router.get('/addProduct', mdw.check_login, productController.layoutAddProducts);

router.post('/addProduct', upload.single('myImage'), mdw.check_login, productController.addProducts);

router.get('/updateProduct', mdw.check_login, productController.layoutUpdateProducts);

router.post('/updateProduct', upload.single('myImage'), mdw.check_login, productController.updateProducts);

router.post('/getIdEditP', mdw.check_login, mdw.check_login, productController.getIdEditProducts);

router.get('/detailProduct', mdw.check_login, productController.layoutDetailProducts);

router.post('/getIdDetailP', mdw.check_login, productController.getIdDetailProducts);

router.post('/deleteProduct', mdw.check_login, productController.deleteProducts);

router.get('/search', mdw.check_login, productController.searchLoai);
router.post('/search', mdw.check_login, productController.searchLoai);

module.exports = router;