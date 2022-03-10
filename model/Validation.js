function Validation() {
  // kiểm tra mã nhân viên từ 4-6 ký số
  this.checkID = function (value, selector) {
    var trimmedValue = value.trim();
    var regexID = /^[0-9]+$/;
    if (regexID.test(trimmedValue)) {
      document.querySelector(selector).innerHTML = "";
      return true;
    } else {
      document.querySelector(selector).innerHTML = "Sai rồi";
      return false;
    }
  };
}
