
function tinhTong(a, b) {
    var tong = (a + b);
    return tong;
}
function tinhHieu(a, b) {
    var hieu = (a - b);
    return hieu;
}
function tinhNhan(a, b) {
    var nhan = (a * b);
    return nhan;
}
function tinhChia(a, b) {
    var chia = (a / b);
    return chia;
}
module.exports = {
    tinhTong,
    tinhHieu,
    tinhNhan,
    tinhChia
};