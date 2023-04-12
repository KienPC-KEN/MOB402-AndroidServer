
class Student {
    constructor(name, mssv, diemTB) {
        this.name = name;
        this.mssv = mssv;
        this.diemTB = diemTB;
    }
    getInfor() {
        return "TenSV: " + this.name + " - MSSV: " + this.mssv + " - diemTB: " + this.diemTB + "\n";
    }

}

module.exports = Student;
