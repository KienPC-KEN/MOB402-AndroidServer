const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const caculator = require("./caculator.js");

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

//Phục vụ file css dạng tĩnh
app.use(express.static(__dirname));

//Nhận dữ liệu sử dùng trình phân tích html
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/caculator.html")
});

//Xử lý post
app.post("/", (req, res) => {
    const { a, b, calculator } = req.body;
    let value = 0;

    switch (calculator) {
        case "cong":
            value = caculator.tinhTong(parseFloat(a), parseFloat(b));
            break;
        case "tru":
            value = caculator.tinhHieu(parseFloat(a), parseFloat(b));
            break;
        case "nhan":
            value = caculator.tinhNhan(parseFloat(a), parseFloat(b));
            break;
        case "chia":
            value = caculator.tinhChia(parseFloat(a), parseFloat(b));
            break;
    }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Gắn Bootstrap -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

    <title>Document</title>
</head>

<body class="jumbotron text-center">
    <h3>Tính toán: cộng trừ nhân chia 2 số</h3>
    <form method="POST" action="/">
        <input style="margin: 8px;" type="number" step="0.1" name="a" placeholder="Số a" value="${a}" >
        <br>
        <input style="margin: 8px;" type="number" step="0.1" name="b" placeholder="Số b" value="${b}">
        <br>
        <select class="form-select mt-4 mb-3" name="calculator">
            <option value="cong">+</option>
            <option value="tru">-</option>
            <option value="nhan">*</option>
            <option value="chia">/</option>
        </select>
        <button type="submit" class="btn btn-primary">Tính</button>
    </form>
   
    <input style="margin: 8px;" type="text " step="0.1" name="b" placeholder="Kết quả" value="${value}">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</body>

</html>
    `);
})