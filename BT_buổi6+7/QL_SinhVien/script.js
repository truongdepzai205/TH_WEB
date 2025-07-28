let students = [];

document.getElementById("student-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const masv = document.getElementById("masv").value.trim();
  const hoten = document.getElementById("hoten").value.trim();
  const email = document.getElementById("email").value.trim();
  const sdt = document.getElementById("sdt").value.trim();
  const gioitinh = document.getElementById("gioitinh").value;
  const namsinh = document.getElementById("namsinh").value.trim();
  const editingIndex = document.getElementById("editingIndex").value;

  if (!masv || !hoten || !email || !sdt || !gioitinh || !namsinh) {
    showNotification("Vui lòng điền đầy đủ thông tin.", "red");
    return;
  }

  if (!validateEmail(email)) {
    showNotification("Email không hợp lệ.", "red");
    return;
  }

  if (!/^\d{9,11}$/.test(sdt)) {
    showNotification("Số điện thoại phải từ 9 đến 11 chữ số.", "red");
    return;
  }

  if (!/^\d{4}$/.test(namsinh) || namsinh < 1900 || namsinh > new Date().getFullYear()) {
    showNotification("Năm sinh không hợp lệ.", "red");
    return;
  }

  const student = { masv, hoten, email, sdt, gioitinh, namsinh };

  if (editingIndex === "") {
    students.push(student);
    showNotification("✅ Thêm sinh viên thành công!", "green");
  } else {
    students[editingIndex] = student;
    showNotification("✅ Cập nhật sinh viên thành công!", "blue");
    document.getElementById("submit-btn").textContent = "Thêm";
    document.getElementById("form-title").textContent = "Thêm sinh viên";
    document.getElementById("editingIndex").value = "";
  }

  this.reset();
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById("student-table-body");
  tbody.innerHTML = "";
  students.forEach((sv, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sv.masv}</td>
      <td>${sv.hoten}</td>
      <td>${sv.email}</td>
      <td>${sv.sdt}</td>
      <td>${sv.gioitinh}</td>
      <td>${sv.namsinh}</td>
      <td>
        <button onclick="editStudent(${index})">Sửa</button>
        <button onclick="deleteStudent(${index})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editStudent(index) {
  const sv = students[index];
  document.getElementById("masv").value = sv.masv;
  document.getElementById("hoten").value = sv.hoten;
  document.getElementById("email").value = sv.email;
  document.getElementById("sdt").value = sv.sdt;
  document.getElementById("gioitinh").value = sv.gioitinh;
  document.getElementById("namsinh").value = sv.namsinh;
  document.getElementById("editingIndex").value = index;

  document.getElementById("submit-btn").textContent = "Cập nhật";
  document.getElementById("form-title").textContent = "Sửa sinh viên";
}

function deleteStudent(index) {
  if (confirm("Bạn có chắc chắn muốn xoá sinh viên này không?")) {
    students.splice(index, 1);
    renderTable();
    showNotification("🗑️ Đã xoá sinh viên thành công!", "orange");
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
  notification.textContent = message;

  if (type === 'success') {
    notification.style.backgroundColor = '#d4edda';
    notification.style.color = '#155724';
    notification.style.borderColor = '#c3e6cb';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f8d7da';
    notification.style.color = '#721c24';
    notification.style.borderColor = '#f5c6cb';
  }

  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
