exports.tinhTong = function (a, b) {
    var tong = (a + b);
    return tong;
}

exports.showInfor = function (mess) {
    return "Thong tin in ra la: " + mess.toUpperCase();
}

exports.showInfor2 = function (mess) {
    if (typeof mess == 'string') {
        return "Thong tin in ra la: " + mess.toUpperCase();
    } else {
        return mess + ": Du lieu khong dung!";
    }
}

