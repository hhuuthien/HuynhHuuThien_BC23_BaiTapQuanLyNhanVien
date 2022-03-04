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

// Hàm tính tổng lương
function calculatingTotalSalary(baseSalary, position) {
  var totalSalary = 0;
  switch (position) {
    case "Giám đốc":
      totalSalary = baseSalary * 3;
      break;
    case "Quản lý":
      totalSalary = baseSalary * 2;
      break;
    case "Nhân viên":
      totalSalary = baseSalary;
      break;
    default:
      break;
  }
  return totalSalary;
}

// Hàm xếp loại nhân viên
function ranking(hoursOfWorking) {
  var rank = "";
  if (hoursOfWorking > 120) {
    rank = "Xuất sắc";
  } else if (hoursOfWorking > 100) {
    rank = "Giỏi";
  } else if (hoursOfWorking > 80) {
    rank = "Khá";
  } else {
    rank = "Trung bình";
  }
  return rank;
}

// Hàm lưu thông tin vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("ARRAY_EMPLOYEE", JSON.stringify(employeeArray));
}

// Hàm lấy thông tin từ localStorage
function getFromLocalStorage() {
  if (localStorage.getItem("ARRAY_EMPLOYEE")) {
    employeeArray = JSON.parse(localStorage.getItem("ARRAY_EMPLOYEE"));
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
  employee.totalSalary = calculatingTotalSalary(employee.baseSalary, employee.position);
  employee.rank = ranking(employee.hoursOfWorking);

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
