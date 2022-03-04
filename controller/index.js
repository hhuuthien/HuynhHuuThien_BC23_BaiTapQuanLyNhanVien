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

// Hàm show toast thông báo
function showToast(content) {
  document.querySelector("#liveToast").innerHTML = content;
  $("#liveToast").toast("show");
}

document.querySelector("#addEmployeeButton").onclick = function () {
  var employee = new Employee();

  employee.id = document.querySelector("#id").value;
  employee.name = document.querySelector("#name").value;
  employee.position = document.querySelector("#position").value;
  employee.baseSalary = +document.querySelector("#baseSalary").value;
  employee.hoursOfWorking = +document.querySelector("#hoursOfWorking").value;
  employee.totalSalary = employee.calculatingTotalSalary();
  employee.rank = employee.ranking();

  employeeArray.push(employee);
  render(employeeArray);
  saveToLocalStorage();
  showToast("Thêm nhân viên thành công");
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
  showToast("Đã xoá nhân viên");
}
