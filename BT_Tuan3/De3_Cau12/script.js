let selectedItems = [];

function displayData() {
    const $tableBody = $('#dataTable');
    $tableBody.empty();

    data.forEach((item, index) => {
        const stt = index + 1;
        const row = `
            <tr>
                <td><div class="bi bi-caret-down-square" onchange="toggleSelection(${index})" style="padding-right: 5px;"></td>
                <td>
                    <button class="btn btn-action btn-view" onclick="viewItem(${index})" title="Xem">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-edit" onclick="editItem(${index})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-delete" onclick="deleteItem(${index})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td><strong>${stt}</strong></td>
                <td>${item.Name}</td>
                <td>${item.LastName}</td>
                <td>${item.address}</td>
                <td>
                    <span class="badge bg-success">
                        &#10003;
                    </span>
               </td>

            </tr>
        `;
        $tableBody.append(row);
    });

    updateDeleteButton();
}

function toggleSelection(index) {
    const itemIndex = selectedItems.indexOf(index);
    if (itemIndex > -1) {
        selectedItems.splice(itemIndex, 1);
    } else {
        selectedItems.push(index);
    }
    updateDeleteButton();
}

function updateDeleteButton() {
    const $deleteButton = $('#deleteSelected');
    if ($deleteButton.length) {
        $deleteButton.prop('disabled', selectedItems.length === 0);
    }
}

function viewItem(index) {
    const item = data[index];
    if (item) {
        alert(`Chi tiết thông tin:\nSTT: ${index + 1}\nTên: ${item.Name}\nHọ Tên: ${item.LastName}\nĐịa chỉ: ${item.address}`);
    }
}

function editItem(index) {
    const item = data[index];
    if (item) {
        $('#customerName').val(item.Name);
        $('#employeeName').val(item.LastName);
        $('#amount').val(item.address);
        $('#notes').val('');

        $('#addModal').data('editIndex', index);
        $('.modal-title').html('<i class="fas fa-edit me-2"></i>Sửa bản ghi');

        const modal = new bootstrap.Modal($('#addModal')[0]);
        modal.show();
    }
}

function deleteItem(index) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        if (index >= 0 && index < data.length) {
            data.splice(index, 1);
            displayData();
            showSuccessMessage('Xóa bản ghi thành công!');
        }
    }
}

function deleteSelectedRecords() {
    if (selectedItems.length === 0) return;

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} bản ghi đã chọn?`)) {
        selectedItems.sort((a, b) => b - a);
        
        selectedItems.forEach(index => {
            if (index >= 0 && index < data.length) {
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
    
    $('#customerName').removeClass('is-invalid');
    $('#employeeName').removeClass('is-invalid');
    $('#amount').removeClass('is-invalid');

    const customerName = $('#customerName').val().trim();
    const employeeName = $('#employeeName').val().trim();
    const amount = $('#amount').val().trim();

    if (!customerName) {
        $('#customerError').text('Vui lòng nhập tên!');
        $('#customerName').addClass('is-invalid');
        isValid = false;
    } else if (customerName.length > 15) {
        $('#customerError').text('Tên không được vượt quá 15 ký tự!');
        $('#customerName').addClass('is-invalid');
        isValid = false;
    }

    if (!employeeName) {
        $('#employeeError').text('Vui lòng nhập họ đệm!');
        $('#employeeName').addClass('is-invalid');
        isValid = false;
    } else if (employeeName.length > 20) {
        $('#employeeError').text('Họ đệm không được vượt quá 20 ký tự!');
        $('#employeeName').addClass('is-invalid');
        isValid = false;
    }

    if (!amount) {
        $('#amountError').text('Vui lòng nhập địa chỉ!');
        $('#amount').addClass('is-invalid');
        isValid = false;
    } else if (amount.length > 50) {
        $('#amountError').text('Địa chỉ không được vượt quá 50 ký tự!');
        $('#amount').addClass('is-invalid');
        isValid = false;
    }

    return isValid;
}

function addRecord() {
    if (!validateForm()) return;

    const customerName = $('#customerName').val().trim();
    const employeeName = $('#employeeName').val().trim();
    const amount = $('#amount').val().trim();
    const editIndex = $('#addModal').data('editIndex');

    if (editIndex !== undefined) {
        const index = parseInt(editIndex);
        if (index >= 0 && index < data.length) {
            data[index] = {
                Name: customerName,
                LastName: employeeName,
                address: amount
            };
            showSuccessMessage('Cập nhật bản ghi thành công!');
        }
        $('#addModal').removeData('editIndex');
    } else {
        const newRecord = {
            Name: customerName,
            LastName: employeeName,
            address: amount
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
    
    $('#customerCount').text('0/15');
    $('#employeeCount').text('0/20');
    $('#amountCount').text('0/50');
    
    $('#customerName').removeClass('is-invalid');
    $('#employeeName').removeClass('is-invalid');
    $('#amount').removeClass('is-invalid');
    
    $('#addModal').removeData('editIndex');
    $('.modal-title').html('<i class="fas fa-plus me-2"></i>Thêm thông tin');
});

$(document).ready(function () {
    displayData();
    
    $('#customerName').on('input', function() {
        const value = $(this).val();
        const $errorElement = $('#customerError');
        const $countElement = $('#customerCount');
        
        $countElement.text(`${value.length}/15`);
        
        if (value.trim().length > 15) {
            $errorElement.text('Tên không được vượt quá 15 ký tự!');
            $(this).addClass('is-invalid');
        } else {
            $errorElement.text('');
            $(this).removeClass('is-invalid');
        }
    });
    
    $('#employeeName').on('input', function() {
        const value = $(this).val();
        const $errorElement = $('#employeeError');
        const $countElement = $('#employeeCount');
        
        $countElement.text(`${value.length}/20`);
        
        if (value.trim().length > 20) {
            $errorElement.text('Họ đệm không được vượt quá 20 ký tự!');
            $(this).addClass('is-invalid');
        } else {
            $errorElement.text('');
            $(this).removeClass('is-invalid');
        }
    });
    
    $('#amount').on('input', function() {
        const value = $(this).val();
        const $errorElement = $('#amountError');
        const $countElement = $('#amountCount');
        
        $countElement.text(`${value.length}/50`);
        
        if (value.trim().length > 50) {
            $errorElement.text('Địa chỉ không được vượt quá 50 ký tự!');
            $(this).addClass('is-invalid');
        } else {
            $errorElement.text('');
            $(this).removeClass('is-invalid');
        }
    });
});