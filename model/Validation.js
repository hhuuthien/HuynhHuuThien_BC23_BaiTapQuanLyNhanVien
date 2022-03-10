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
}
