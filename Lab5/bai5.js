const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require("fs");


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
            if (arr[i] == "jpeg") {
                if (i != arr.length - 1) {
                    newFileName += arr[i]
                } else {
                    newFileName += ('-' + Date.now() + '.' + arr[i])
                }
            } else {
                if (i != arr.length - 1) {
                    newFileName += "jpeg"
                } else {
                    newFileName += ('-' + Date.now() + '.' + "jpeg")
                }
            }


        }

        cb(null, newFileName)
    }
})

var upload = multer({ storage: storage })

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/bai5.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});