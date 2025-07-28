const tableBody = document.getElementById("employeeTable");
const popup = document.getElementById("popupForm");
const openForm = document.getElementById("openForm");
const closePopup = document.getElementById("closePopup");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const addressField = document.getElementById("address");
const phoneField = document.getElementById("phone");
const errorMsg = document.getElementById("errorMsg");

function renderTable() {
  tableBody.innerHTML = "";
  employeeData.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.address}</td>
      <td>${emp.phone}</td>
      <td>
        <button title="Edit">✏️</button>
        <button title="Delete">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function showForm() {
  popup.style.display = "flex";
}

function hideForm() {
  popup.style.display = "none";
  clearForm();
}

function clearForm() {
  nameField.value = "";
  emailField.value = "";
  addressField.value = "";
  phoneField.value = "";
  errorMsg.textContent = "";
}

function validateForm(name, email, address, phone) {
  if (!name || !email || !address || !phone) {
    errorMsg.textContent = "Vui lòng điền đầy đủ thông tin!";
    return false;
  }
  if (!/^0\d{9}$/.test(phone)) {
    errorMsg.textContent = "Số điện thoại phải bắt đầu bằng 0 và có đúng 10 chữ số!";
    return false;
  }
  return true;
}

function addEmployee() {
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const address = addressField.value.trim();
  const phone = phoneField.value.trim();

  if (!validateForm(name, email, address, phone)) return;

  employeeData.push({ name, email, address, phone });
  renderTable();
  hideForm();
}


openForm.onclick = showForm;
closePopup.onclick = hideForm;
cancelBtn.onclick = hideForm;
addBtn.onclick = addEmployee;

window.onload = renderTable;
