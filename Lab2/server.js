var http = require('http');
var uc = require('upper-case');
var fs = require('fs');
var untils = require('./utils.js');
var student = require("./student.js");

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("Tong 2 so 7 + 4 = " + untils.tinhTong(7, 4) + "\n");
    res.write(untils.showInfor("Ngay 10 Thang 3 Nam 2023") + "\n");
    res.write(untils.showInfor2(19) + "\n");
    res.write(untils.showInfor2("aa") + "\n");

    res.write("=========Class==============\n");
    let date = new Date();
    let year = date.getFullYear();

    let myCar = new Car("Ford", 2014);
    res.write("My car is " + myCar.age(year) + " years old.\n");

    res.write("=========Array==============\n");
    var cars = new Array();
    cars.push(myCar);
    cars.push(new Car("Met-xe-det", 2014));
    cars.push(new Car("Toyota", 2023));
    cars.push(new Car("Honda", 2007));
    //Xóa trong mảng
    cars.splice(1, 1);
    //Hiển thị mảng
    var carsInforr = "";
    // for (let index = 0; index < cars.length; index++) {
    //    var car = cars.at(index);
    //    carsInforr += "Xe: " + car.name + " -- Nam SX: " + car.year + "\n";

    // }

    cars.forEach(element => {
        carsInforr += "Xe: " + element.name + " -- Nam SX: " + element.year + "\n";
    });

    res.write(carsInforr);
    //====================


    var studentArr = new Array();
    var Student = new student("Phung Chi Kien", "PH23267", 8.9);
    studentArr.push(Student);
    studentArr.push(new student('St2','999',222));
    studentArr.push(new student('St3','999',222));
    studentArr.push(new student('St4','999',222));
    console.log(studentArr);
    var studentInfo = "";
    studentArr.forEach(element => {
        var st = element.getInfor();
        studentInfo += st;
    });
    res.write(studentInfo);
    return res.end();
}).listen(3000); // 8000 || 8100 || 3000 || 3030

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age(x) {
        return x - this.year;
    }
}