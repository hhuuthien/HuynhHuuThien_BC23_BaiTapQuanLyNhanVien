function Validation() {
  this.checkID = function (value, selector, minLength, maxLength) {
    var regexID = /^[0-9]+$/;
    if (regexID.test(value) && value.length >= minLength && value.length <= maxLength) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = `Mã nhân viên phải có từ ${minLength}-${maxLength} ký số`;
      return false;
    }
  };

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

  this.checkBaseSalary = function (value, selector, min, max) {
    var regex = /^[0-9]+$/;
    if (regex.test(value) && Number(value) >= min && Number(value) <= max) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = `Lương cơ bản phải là số từ ${min} đến ${max}`;
      return false;
    }
  };

  this.checkHoursOfWorking = function (value, selector, min, max) {
    var regex = /^[0-9]+$/;
    if (regex.test(value) && Number(value) >= min && Number(value) <= max) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = `Số giờ làm trong tháng phải là số từ ${min} đến ${max}`;
      return false;
    }
  };

  // làm thêm: kiểm tra trùng mã nhân viên
  this.checkDuplicatedID = function (value, array, selector) {
    var valid = true;
    for (let index = 0; index < array.length; index++) {
      if (value === array[index].id) {
        valid = false;
        break;
      }
    }

    if (valid) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = `ID đã tồn tại`;
      return false;
    }
  };
}
