function Employee() {
  this.id = "";
  this.name = "";
  this.position = "";
  this.baseSalary = "";
  this.hoursOfWorking = "";
  this.totalSalary = "";
  this.rank = "";
  this.calculatingTotalSalary = function () {
    var totalSalary = 0;
    switch (this.position) {
      case "Giám đốc":
        totalSalary = this.baseSalary * 3;
        break;
      case "Quản lý":
        totalSalary = this.baseSalary * 2;
        break;
      case "Nhân viên":
        totalSalary = this.baseSalary;
        break;
      default:
        break;
    }
    return totalSalary;
  };
  this.ranking = function () {
    var rank = "";
    if (this.hoursOfWorking > 120) {
      rank = "Xuất sắc";
    } else if (this.hoursOfWorking > 100) {
      rank = "Giỏi";
    } else if (this.hoursOfWorking > 80) {
      rank = "Khá";
    } else {
      rank = "Trung bình";
    }
    return rank;
  };
}
