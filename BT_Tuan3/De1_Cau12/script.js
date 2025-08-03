let currentPage = 1;
const entriesPerPage = 5;

function renderTable() {
  const start = (currentPage - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  const visibleEmployees = employees.slice(start, end);

  const $tableBody = $("#tableBody");
  $tableBody.empty();

  visibleEmployees.forEach((emp) => {
    $tableBody.append(`
      <tr>
        <td><input type="checkbox" /></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">✏️</button>
          <button class="btn btn-sm btn-danger">🗑️</button>
        </td>
      </tr>
    `);
  });

  $("#showingCount").text(visibleEmployees.length);
  $("#totalCount").text(employees.length);

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(employees.length / entriesPerPage);
  const $pagination = $("#paginationButtons");
  $pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    $pagination.append(`
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
      </li>
    `);
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function validateForm(name, email, address, phone) {
  const errors = [];
  if (!name) {
    errors.push("Tên không được để trống");
  }
  if (!email) {
    errors.push("Email không được để trống");
  }
  if (!address) {
    errors.push("Địa chỉ không được để trống");
  }
  if (!phone) {
    errors.push("Số điện thoại không được để trống");
  }
  if (phone) {
    if (phone.length !== 10) {
      errors.push("Số điện thoại phải có đúng 10 ký tự");
    }
    if (!phone.startsWith('0')) {
      errors.push("Số điện thoại phải bắt đầu bằng số 0");
    }
    if (!/^\d+$/.test(phone)) {
      errors.push("Số điện thoại chỉ được chứa các chữ số");
    }
  }
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email không đúng định dạng");
    }
  }

  return errors;
}

function showErrorMessage(errors) {
  $('.alert-danger').remove();

  if (errors.length > 0) {
    const errorHtml = `
      <div class="alert alert-danger alert-dismissible fade show">
        <strong>Lỗi:</strong>
        <ul class="mb-0 mt-2">
          ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    const $modalBody = $('#modalAdd .modal-body');
    $modalBody.prepend(errorHtml);
    return true;
  }
  return false;
}

function addEmployee(e) {
  e.preventDefault();
  const name = $("#name").val().trim();
  const email = $("#email").val().trim();
  const address = $("#address").val().trim();
  const phone = $("#phone").val().trim();

  const errors = validateForm(name, email, address, phone);
  
  if (showErrorMessage(errors)) {
    return;
  }

  employees.push({ name, email, address, phone });

  $("#addForm")[0].reset();
  bootstrap.Modal.getInstance($('#modalAdd')[0]).hide();
  renderTable();
  
  showSuccessMessage("Thêm nhân viên thành công!");
}

function showSuccessMessage(message) {
  $('.alert-success').remove();

  const successHtml = `
    <div class="alert alert-success alert-dismissible fade show">
      <strong>Thành công:</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  
  const $container = $('.container');
  $container.prepend(successHtml);
  
  setTimeout(() => {
    $('.alert-success').remove();
  }, 3000);
}

function searchEmployee() {
  const keyword = $("#searchInput").val().toLowerCase();
  const $tableBody = $("#tableBody");
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(keyword) ||
    emp.email.toLowerCase().includes(keyword) ||
    emp.address.toLowerCase().includes(keyword) ||
    emp.phone.includes(keyword)
  );

  $tableBody.empty();

  filtered.forEach(emp => {
    $tableBody.append(`
      <tr>
        <td><input type="checkbox" /></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">✏️</button>
          <button class="btn btn-sm btn-danger">🗑️</button>
        </td>
      </tr>
    `);
  });

  $("#showingCount").text(filtered.length);
  $("#totalCount").text(employees.length);
}

function setupFormValidation() {
  const formInputs = ['name', 'email', 'address', 'phone'];
  
  formInputs.forEach(inputId => {
    const $input = $(`#${inputId}`);
    if ($input.length) {
      $input.on('input', () => {
        const $existingAlert = $('#modalAdd .alert-danger');
        if ($existingAlert.length) {
          $existingAlert.css('opacity', '0');
          setTimeout(() => {
            $existingAlert.remove();
          }, 300);
        }
      });
    }
  });
  const $phoneInput = $('#phone');
  if ($phoneInput.length) {
    $phoneInput.on('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    
      if (this.value.length > 10) {
        this.value = this.value.substring(0, 10);
      }
    });
  }
}

$(document).ready(function() {
  renderTable();
  setupFormValidation();
});