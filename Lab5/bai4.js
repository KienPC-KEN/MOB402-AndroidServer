const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require("fs");
const { MulterError } = require('multer');


app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = "./uploads"
        //Nếu chưa có thư mục đó thì tạo nó ra
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, 'uploads')
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

var upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } }).single('myFile');

app.post('/uploadfile', (req, res) => {
    upload(req, res, function (err) {
        const file = req.file
        if (err instanceof multer.MulterError) {
            return res.send("kích thước file lớn hơn 1MB");
            // A Multer error occurred when uploading.
        } else if (err) {

            res.send("Tệp không xác định")
            // An unknown error occurred when uploading.
        }
        
        res.send("upload thành công")
        res.send(file)
        // Everything went fine.
    })
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bai4.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});