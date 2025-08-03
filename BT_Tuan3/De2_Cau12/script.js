let selectedItems = [];

function displayData() {
    const $tableBody = $('#dataTable');
    $tableBody.empty();

    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>
                    <input type="checkbox" class="form-check-input me-2" onchange="toggleSelection(${item.id})">
                    <button class="btn btn-action btn-view" onclick="viewItem(${item.id})" title="Xem">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-edit" onclick="editItem(${item.id})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-delete" onclick="deleteItem(${item.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td><strong>${item.id}</strong></td>
                <td>${item.customerName}</td>
                <td>${item.employeeName}</td>
                <td><strong>${formatCurrency(item.amount)}</strong></td>
                <td>${formatDate(item.createdDate)}</td>
            </tr>
        `;
        $tableBody.append(row);
    });

    updateDeleteButton();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} tháng ${month} năm ${year}`;
}

function toggleSelection(id) {
    const index = selectedItems.indexOf(id);
    if (index > -1) {
        selectedItems.splice(index, 1);
    } else {
        selectedItems.push(id);
    }
    updateDeleteButton();
}

function updateDeleteButton() {
    const $deleteButton = $('#deleteSelected');
    $deleteButton.prop('disabled', selectedItems.length === 0);
}

function viewItem(id) {
    const item = data.find(d => d.id === id);
    if (item) {
        alert(`Chi tiết giao dịch:\nID: ${item.id}\nKhách hàng: ${item.customerName}\nNhân viên: ${item.employeeName}\nSố tiền: ${formatCurrency(item.amount)}\nNgày: ${formatDate(item.createdDate)}\nGhi chú: ${item.notes || 'Không có'}`);
    }
}

function editItem(id) {
    const item = data.find(d => d.id === id);
    if (item) {
        $('#customerName').val(item.customerName);
        $('#employeeName').val(item.employeeName);
        $('#amount').val(item.amount);
        $('#notes').val(item.notes || '');

        $('#addModal').data('editId', id);
        $('.modal-title').html('<i class="fas fa-edit me-2"></i>Sửa bản ghi');

        const modal = new bootstrap.Modal($('#addModal')[0]);
        modal.show();
    }
}

function deleteItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        const index = data.findIndex(d => d.id === id);
        if (index > -1) {
            data.splice(index, 1);
            displayData();
            showSuccessMessage('Xóa bản ghi thành công!');
        }
    }
}

function deleteSelectedRecords() {
    if (selectedItems.length === 0) return;

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} bản ghi đã chọn?`)) {
        selectedItems.forEach(id => {
            const index = data.findIndex(d => d.id === id);
            if (index > -1) {
                data.splice(index, 1);
            }
        });

        selectedItems = [];
        displayData();
        showSuccessMessage('Đã xóa các bản ghi đã chọn!');
    }
}

function validateForm() {
    let isValid = true;

    $('#customerError').text('');
    $('#employeeError').text('');
    $('#amountError').text('');

    const customerName = $('#customerName').val().trim();
    const employeeName = $('#employeeName').val().trim();
    const amount = $('#amount').val();

    if (!customerName) {
        $('#customerError').text('Vui lòng nhập tên khách hàng');
        isValid = false;
    } else if (customerName.length > 30) {
        $('#customerError').text('Tên khách hàng không được quá 30 ký tự');
        isValid = false;
    }

    if (!employeeName) {
        $('#employeeError').text('Vui lòng nhập tên nhân viên');
        isValid = false;
    } else if (employeeName.length > 30) {
        $('#employeeError').text('Tên nhân viên không được quá 30 ký tự');
        isValid = false;
    }

    if (!amount || amount <= 0) {
        $('#amountError').text('Vui lòng nhập số tiền hợp lệ');
        isValid = false;
    }

    return isValid;
}

function addRecord() {
    if (!validateForm()) return;

    const customerName = $('#customerName').val().trim();
    const employeeName = $('#employeeName').val().trim();
    const amount = parseFloat($('#amount').val());
    const notes = $('#notes').val().trim();
    const editId = $('#addModal').data('editId');

    if (editId) {
        const index = data.findIndex(d => d.id == editId);
        if (index > -1) {
            data[index] = {
                ...data[index],
                customerName,
                employeeName,
                amount,
                notes
            };
            showSuccessMessage('Cập nhật bản ghi thành công!');
        }
        $('#addModal').removeData('editId');
    } else {
        const newRecord = {
            id: nextId++,
            customerName,
            employeeName,
            amount,
            createdDate: new Date().toISOString().split('T')[0],
            notes
        };
        data.push(newRecord);
        showSuccessMessage('Thêm bản ghi thành công!');
    }

    displayData();
    $('#addForm')[0].reset();

    const modal = bootstrap.Modal.getInstance($('#addModal')[0]);
    modal.hide();
}

function showSuccessMessage(message) {
    const $alert = $(`
        <div class="alert alert-success alert-dismissible fade show success-alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
            <strong>Thành công!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    $('body').append($alert);

    setTimeout(() => {
        $alert.remove();
    }, 3000);
}

$('#addModal').on('show.bs.modal', function () {
    $('#addForm')[0].reset();
    $('#customerError').text('');
    $('#employeeError').text('');
    $('#amountError').text('');
    $('#addModal').removeData('editId');
    $('.modal-title').html('<i class="fas fa-plus me-2"></i>Thêm giao dịch');
});

$(document).ready(function () {
    displayData();
    
    $('#deleteSelected').on('click', deleteSelectedRecords);
});