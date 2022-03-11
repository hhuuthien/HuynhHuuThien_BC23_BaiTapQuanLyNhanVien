var employeeArray = [];

getFromLocalStorage();
render(employeeArray);

// Hàm render dữ liệu từ mảng ra bảng, bổ sung trường hợp không có dữ liệu
function render(array) {
  var stringHTML = "";

  if (array.length !== 0) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      stringHTML += `<tr>
                  <td>${element.id}</td>
                  <td>${element.name}</td>
                  <td>${element.position}</td>
                  <td>${element.baseSalary}</td>
                  <td>${element.totalSalary}</td>
                  <td>${element.hoursOfWorking}</td>
                  <td>${element.rank}</td>
                  <td>
                    <button class="btn btn-danger" onclick="showConfirmationToDelete('${element.id}','${element.name}')" data-toggle="modal" data-target="#deleteConfirmationModal">Xoá</button>
                    <button class="btn btn-primary" onclick="showModalToEdit('${element.id}')" data-toggle="modal" data-target="#editModal">Chỉnh sửa</button>
                  </td>
              </tr>`;
    }
  } else {
    stringHTML += `<tr><td colspan="8" class="text-center">Không có dữ liệu</td></tr>`;
  }

  document.querySelector("#tableBody").innerHTML = stringHTML;
}

// Hàm lưu thông tin vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("ARRAY_EMPLOYEE", JSON.stringify(employeeArray));
}

// Hàm lấy thông tin từ localStorage
function getFromLocalStorage() {
  if (localStorage.getItem("ARRAY_EMPLOYEE")) {
    // làm kiểu này thì các employee sẽ không có 2 hàm calculatingTotalSalary và ranking
    // employeeArray = JSON.parse(localStorage.getItem("ARRAY_EMPLOYEE"));

    var temp = JSON.parse(localStorage.getItem("ARRAY_EMPLOYEE"));
    for (let i = 0; i < temp.length; i++) {
      var element = temp[i];

      //tạo employee mới có chứa 2 hàm -> gắn thông tin từ mảng tạm qua -> lưu vào mảng chính
      var employee = new Employee();
      employee.id = element.id;
      employee.name = element.name;
      employee.position = element.position;
      employee.baseSalary = element.baseSalary;
      employee.hoursOfWorking = element.hoursOfWorking;
      employee.totalSalary = element.totalSalary;
      employee.rank = element.rank;

      employeeArray.push(employee);
    }
  }
}

document.querySelector("#addEmployeeButton").onclick = function () {
  var employee = new Employee();

  employee.id = document.querySelector("#id").value.trim();
  employee.name = document.querySelector("#name").value.trim();
  employee.position = document.querySelector("#position").value;
  employee.baseSalary = +document.querySelector("#baseSalary").value.trim();
  employee.hoursOfWorking = +document.querySelector("#hoursOfWorking").value.trim();
  employee.totalSalary = employee.calculatingTotalSalary();
  employee.rank = employee.ranking();

  // validation
  var validator = new Validation();
  var valid = true;
  valid &= validator.checkID(employee.id, "#idError", 4, 6);
  valid &= validator.checkDuplicatedID(employee.id, employeeArray, "#idError2");
  valid &= validator.checkName(employee.name, "#nameError");
  valid &= validator.checkBaseSalary(employee.baseSalary, "#baseSalaryError", 1000000, 20000000);
  valid &= validator.checkHoursOfWorking(employee.hoursOfWorking, "#hoursOfWorkingError", 50, 150);
  if (!valid) return;

  employeeArray.push(employee);
  render(employeeArray);
  saveToLocalStorage();
  clearInput();
};

// Hàm show modal xác nhận xoá nhân viên và gắn thông tin lên modal
function showConfirmationToDelete(employeeID, employeeName) {
  document.querySelector("#deleteConfirmationModalBody").innerHTML = `Bạn có chắc muốn xoá nhân viên <b>${employeeName}</b> có mã số <b>${employeeID}</b> không?`;
  document.querySelector("#deleteConfirmationModalFooter").innerHTML = `
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Không xoá</button>
    <button type="button" class="btn btn-primary" onclick="deleteEmployee('${employeeID}')">Xoá nhân viên</button>`;
}

// Hàm xoá nhân viên
function deleteEmployee(employeeID) {
  for (let i = 0; i < employeeArray.length; i++) {
    const element = employeeArray[i];
    if (element.id === employeeID) {
      employeeArray.splice(i, 1);
    }
  }

  render(employeeArray);
  saveToLocalStorage();

  $("#deleteConfirmationModal").modal("hide");
}

// Hàm hiển thị modal để nhập thông tin cần chỉnh sửa
function showModalToEdit(employeeID) {
  for (let i = 0; i < employeeArray.length; i++) {
    const element = employeeArray[i];
    if (element.id === employeeID) {
      document.querySelector("#id_edit").value = element.id;
      document.querySelector("#name_edit").value = element.name;
      document.querySelector("#position_edit").value = element.position;
      document.querySelector("#baseSalary_edit").value = element.baseSalary;
      document.querySelector("#hoursOfWorking_edit").value = element.hoursOfWorking;

      document.querySelector("#editModalFooter").innerHTML = `
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" onclick="editEmployee('${employeeID}')">Cập nhật</button>`;
    }
  }
}

// Hàm sửa nhân viên
function editEmployee(employeeID) {
  var employeeName = document.querySelector("#name_edit").value.trim();
  var employeePosition = document.querySelector("#position_edit").value;
  var employeeBaseSalary = +document.querySelector("#baseSalary_edit").value.trim();
  var employeeHoursOfWorking = +document.querySelector("#hoursOfWorking_edit").value.trim();

  // validation
  var validator = new Validation();
  var valid = true;
  valid &= validator.checkName(employeeName, "#nameEditError");
  valid &= validator.checkBaseSalary(employeeBaseSalary, "#baseSalaryEditError", 1000000, 20000000);
  valid &= validator.checkHoursOfWorking(employeeHoursOfWorking, "#hoursOfWorkingEditError", 50, 150);
  if (!valid) return;

  for (let i = 0; i < employeeArray.length; i++) {
    const element = employeeArray[i];
    if (element.id === employeeID) {
      element.name = employeeName;
      element.position = employeePosition;
      element.baseSalary = employeeBaseSalary;
      element.hoursOfWorking = employeeHoursOfWorking;
      element.totalSalary = element.calculatingTotalSalary();
      element.rank = element.ranking();
    }
  }

  render(employeeArray);
  saveToLocalStorage();

  $("#editModal").modal("hide");
}

// Hàm clear input
function clearInput() {
  document.querySelector("#id").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#position").value = "Giám đốc";
  document.querySelector("#baseSalary").value = "";
  document.querySelector("#hoursOfWorking").value = "";
}

// Tìm kiếm nhân viên
document.querySelector("#searchButton").onclick = function () {
  var keyword = document.querySelector("#keyword").value.trim();
};
