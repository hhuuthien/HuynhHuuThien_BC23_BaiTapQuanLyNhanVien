function Validation() {
  // kiểm tra mã nhân viên từ 4-6 ký số
  this.checkID = function (value, selector) {
    var regexID = /^[0-9]+$/;
    if (regexID.test(value) && value.length >= 4 && value.length <= 6) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = "Mã nhân viên phải có từ 4-6 ký số";
      return false;
    }
  };

  // kiểm tra tên nhân viên phải là chữ, chấp nhận tiếng Việt có dấu
  this.checkName = function (value, selector) {
    var regexName = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
    if (regexName.test(value)) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = "Tên nhân viên phải là chữ";
      return false;
    }
  };

  // kiểm tra lương cơ bản từ 1M đến 20M
  this.checkBaseSalary = function (value, selector) {
    var regex = /^[0-9]+$/;
    if (regex.test(value) && Number(value) >= 1000000 && Number(value) <= 20000000) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = "Lương cơ bản phải là số từ 1 triệu đến 20 triệu";
      return false;
    }
  };

  // kiểm tra số giờ làm trong tháng từ 50 đến 150 giờ
  this.checkHoursOfWorking = function (value, selector) {
    var regex = /^[0-9]+$/;
    if (regex.test(value) && Number(value) >= 50 && Number(value) <= 150) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = "Số giờ làm trong tháng phải là số từ 50 đến 150";
      return false;
    }
  };
}
