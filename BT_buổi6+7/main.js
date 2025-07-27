const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const majorInput = document.getElementById("major");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const tableBody = document.querySelector("#studentTable tbody");
const message = document.getElementById("message");
const updateBtn = document.getElementById("updateBtn");

let editingRow = null;

function validateInput() {
  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const major = majorInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!name || !age || !major || !email || !phone) {
    alert("❌ Vui lòng điền đầy đủ thông tin!");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("❌ Email không hợp lệ!");
    return false;
  }

  if (!phoneRegex.test(phone)) {
    alert("❌ Số điện thoại phải là 10 chữ số!");
    return false;
  }

  const ageNumber = parseInt(age, 10);
  if (isNaN(ageNumber) || ageNumber <= 0) {
    alert("❌ Tuổi phải là số nguyên dương!");
    return false;
  }

  return true;
}

function showMessage(text, duration = 2000) {
  message.textContent = text;
  setTimeout(() => (message.textContent = ""), duration);
}

function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  majorInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  editingRow = null;
  updateBtn.style.display = "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateInput()) return;

  const row = tableBody.insertRow();
  row.innerHTML = `
    <td>${nameInput.value}</td>
    <td>${ageInput.value}</td>
    <td>${majorInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${phoneInput.value}</td>
    <td>
      <button onclick="editRow(this)">Sửa</button>
      <button class="delete-btn" onclick="deleteRow(this)">Xóa</button>
    </td>
  `;

  clearForm();
  showMessage("✅ Thêm sinh viên thành công!");
});

function editRow(button) {
  editingRow = button.parentElement.parentElement;
  const cells = editingRow.cells;

  nameInput.value = cells[0].textContent;
  ageInput.value = cells[1].textContent;
  majorInput.value = cells[2].textContent;
  emailInput.value = cells[3].textContent;
  phoneInput.value = cells[4].textContent;

  updateBtn.style.display = "inline-block";
}

updateBtn.addEventListener("click", () => {
  if (!validateInput()) return;

  const cells = editingRow.cells;
  cells[0].textContent = nameInput.value;
  cells[1].textContent = ageInput.value;
  cells[2].textContent = majorInput.value;
  cells[3].textContent = emailInput.value;
  cells[4].textContent = phoneInput.value;

  clearForm();
  showMessage("✅ Cập nhật thành công!");
});

function deleteRow(button) {
  if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    const row = button.parentElement.parentElement;
    tableBody.removeChild(row);
    showMessage("✅ Đã xóa sinh viên!");
  }
}
