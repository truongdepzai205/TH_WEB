// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements (Keep all for UI consistency, but most will have disabled listeners)
    const transactionTableBody = document.getElementById('transactionTableBody');
    const paginationList = document.getElementById('paginationList');
    const paginationInfo = document.getElementById('paginationInfo');
    const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
    const transactionSearchInput = document.getElementById('transactionSearchInput');
    const searchTransactionBtn = document.getElementById('searchTransactionBtn');
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const addTransactionModal = document.getElementById('addTransactionModal');
    const closeButtons = document.querySelectorAll('.close-button');
    const cancelAddTransaction = document.getElementById('cancelAddTransaction');
    const addTransactionForm = document.getElementById('addTransactionForm');
    const modalTitle = document.getElementById('modalTitle');
    const transactionIdInput = document.getElementById('transactionId');
    const customerNameInput = document.getElementById('customerName');
    const employeeNameInput = document.getElementById('employeeName');
    const amountInput = document.getElementById('amount');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const deleteSelectedBtn = document.querySelector('button.delete-selected');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationModalMessage = document.getElementById('confirmationModalMessage');
    const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
    const confirmActionBtn = document.getElementById('confirmActionBtn');
    const sortIcons = document.querySelectorAll('th .fa-sort');
    const modalSubmitButton = addTransactionForm.querySelector('button[type="submit"]');

    // State variables (minimal for this version)
    // No need for currentPage, itemsPerPage, currentSearchTerm, currentSortColumn, currentSortDirection, transactionToEdit, isViewing
    
    // --- Utility Functions ---
    const showLoading = (text = 'Đang tải...') => {
        document.getElementById('loadingText').textContent = text;
        loadingOverlay.classList.remove('hidden');
        loadingOverlay.style.display = 'flex'; // Ensure flex display for centering
    };

    const hideLoading = () => {
        loadingOverlay.classList.add('hidden');
        loadingOverlay.style.display = 'none';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString) => {
        return dateString;
    };

    const showModal = (modalElement) => {
        modalElement.style.display = 'flex'; // Use flex to ensure centering
    };

    const hideModal = (modalElement) => {
        modalElement.style.display = 'none';
    };

    const generateUniqueId = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000); // Increased random range for better uniqueness
        return `${timestamp}-${random}`;
    };

    const addErrorClass = (element) => {
        element.classList.add('border-red-500', 'ring-red-500', 'ring-1');
    };

    const removeErrorClass = (element) => {
        element.classList.remove('border-red-500', 'ring-red-500', 'ring-1');
    };

    const validateForm = () => {
        let isValid = true;
        const customerName = customerNameInput.value.trim();
        const employeeName = employeeNameInput.value.trim();
        const amount = amountInput.value.trim(); // Get as string for initial check

        // Reset errors
        document.getElementById('customerNameError').textContent = '';
        document.getElementById('employeeNameError').textContent = '';
        document.getElementById('amountError').textContent = '';
        removeErrorClass(customerNameInput);
        removeErrorClass(employeeNameInput);
        removeErrorClass(amountInput);

        // Validate Customer Name
        if (customerName === '') {
            document.getElementById('customerNameError').textContent = 'Tên khách hàng không được để trống.';
            addErrorClass(customerNameInput);
            isValid = false;
        } else if (customerName.length > 30) {
            document.getElementById('customerNameError').textContent = 'Tên khách hàng không được quá 30 ký tự.';
            addErrorClass(customerNameInput);
            isValid = false;
        } else if (!/^[a-zA-Z\sÀ-ỹà-ỳĐđ]+$/.test(customerName)) { // Allow Vietnamese characters
            document.getElementById('customerNameError').textContent = 'Tên khách hàng chỉ được chứa chữ cái và khoảng trắng.';
            addErrorClass(customerNameInput);
            isValid = false;
        }

        // Validate Employee Name
        if (employeeName === '') {
            document.getElementById('employeeNameError').textContent = 'Tên nhân viên không được để trống.';
            addErrorClass(employeeNameInput);
            isValid = false;
        } else if (employeeName.length > 30) {
            document.getElementById('employeeNameError').textContent = 'Tên nhân viên không được quá 30 ký tự.';
            addErrorClass(employeeNameInput);
            isValid = false;
        } else if (!/^[a-zA-Z\sÀ-ỹà-ỳĐđ]+$/.test(employeeName)) { // Allow Vietnamese characters
            document.getElementById('employeeNameError').textContent = 'Tên nhân viên chỉ được chứa chữ cái và khoảng trắng.';
            addErrorClass(employeeNameInput);
            isValid = false;
        }

        // Validate Amount
        if (amount === '') {
            document.getElementById('amountError').textContent = 'Số tiền không được để trống.';
            addErrorClass(amountInput);
            isValid = false;
        } else {
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount)) {
                document.getElementById('amountError').textContent = 'Số tiền phải là một số hợp lệ.';
                addErrorClass(amountInput);
                isValid = false;
            } else if (parsedAmount <= 0) {
                document.getElementById('amountError').textContent = 'Số tiền phải là một số dương.';
                addErrorClass(amountInput);
                isValid = false;
            }
        }
        
        return isValid;
    };

    const clearForm = () => {
        addTransactionForm.reset();
        transactionIdInput.value = ''; // Clear hidden ID as well
        document.getElementById('customerNameError').textContent = '';
        document.getElementById('employeeNameError').textContent = '';
        document.getElementById('amountError').textContent = '';
        removeErrorClass(customerNameInput);
        removeErrorClass(employeeNameInput);
        removeErrorClass(amountInput);
    };

    // --- Render Function (Adapted to display all data and UI elements) ---
    const renderTable = (transactionsToDisplay) => {
        transactionTableBody.innerHTML = ''; // Clear existing rows
        if (transactionsToDisplay.length === 0) {
            transactionTableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-gray-500">Không có giao dịch nào được tìm thấy.</td></tr>`;
            return;
        }

        // Always display all transactions
        transactionsToDisplay.forEach(transaction => {
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-50');
            row.innerHTML = `
                <td class="py-3 px-4 border-b border-gray-200">
                    <input type="checkbox" class="transaction-checkbox h-4 w-4 text-blue-600 rounded">
                </td>
                <td class="py-3 px-4 border-b border-gray-200 flex items-center gap-2">
                    <button class="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-100 transition duration-150" data-id="${transaction.id}" title="Xem"><i class="fas fa-eye"></i></button>
                    <button class="text-yellow-500 hover:text-yellow-700 p-1 rounded hover:bg-yellow-100 transition duration-150" data-id="${transaction.id}" title="Sửa"><i class="fas fa-edit"></i></button>
                    <button class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition duration-150" data-id="${transaction.id}" title="Xóa"><i class="fas fa-trash-alt"></i></button>
                </td>
                <td class="py-3 px-4 border-b border-gray-200">${transaction.id}</td>
                <td class="py-3 px-4 border-b border-gray-200">${transaction.customerName}</td>
                <td class="py-3 px-4 border-b border-gray-200">${transaction.employeeName}</td>
                <td class="py-3 px-4 border-b border-gray-200">${formatCurrency(transaction.amount)}</td>
                <td class="py-3 px-4 border-b border-gray-200">${formatDate(transaction.purchaseDate)}</td>
            `;
            transactionTableBody.appendChild(row);
        });

        // Attach *dummy* event listeners for buttons that shouldn't work
        // These will override any default behaviors or previous assignments
        attachDummyTableEventListeners(); 
    };

    // This function now just calls renderTable with all current transactions.
    // It ignores search, sort, pagination.
    const filterAndRenderTransactions = () => {
        showLoading(); 
        setTimeout(() => { 
            renderTable(transactions); // Always render all transactions
            renderPagination(transactions.length); // Render pagination UI but it won't be functional
            hideLoading();
        }, 300); 
    };

    // --- Event Listeners ---

    // Functional: Add Transaction Button
    addTransactionBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Thêm giao dịch';
        modalSubmitButton.textContent = 'Thêm';
        clearForm();
        showModal(addTransactionModal);
    });

    // Functional: Close Modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            hideModal(addTransactionModal);
            hideModal(confirmationModal); // Keep this hidden in case any old logic tries to show it
        });
    });
    cancelAddTransaction.addEventListener('click', () => hideModal(addTransactionModal));

    // Functional: Handle clicks outside modal to close them
    window.addEventListener('click', (event) => {
        if (event.target === addTransactionModal) {
            hideModal(addTransactionModal);
        }
        if (event.target === confirmationModal) { // Keep this in case
            hideModal(confirmationModal);
        }
    });

    // Functional: Add Transaction Form Submission
    addTransactionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return; // Stop if validation fails
        }

        showLoading('Đang thêm giao dịch...');
        setTimeout(() => { // Simulate network delay
            const customerName = customerNameInput.value.trim();
            const employeeName = employeeNameInput.value.trim();
            const amount = parseFloat(amountInput.value);
            const currentDate = new Date();
            const purchaseDate = `${currentDate.getDate()} Tháng ${currentDate.getMonth() + 1} ${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

            const newTransaction = {
                id: generateUniqueId(),
                customerName,
                employeeName,
                amount,
                purchaseDate
            };
            transactions.push(newTransaction); // Add new transaction to the array

            hideLoading();
            hideModal(addTransactionModal);
            clearForm(); // Clear the form after successful submission
            filterAndRenderTransactions(); // Re-render table with the new data
        }, 500); // Simulated delay
    });

    // --- Disabled Event Listeners (UI is present but no functionality) ---

    // Dummy function for disabled features
    const disabledFeatureAlert = (featureName) => {
        console.log(`Tính năng "${featureName}" đã bị vô hiệu hóa trong phiên bản này.`);
        // You can add a subtle visual feedback here if desired, e.g., a toast notification
        // alert(`Tính năng "${featureName}" đã bị vô hiệu hóa.`); 
    };

    // Dummy Pagination Render (UI only)
    const renderPagination = (totalItems) => {
        paginationList.innerHTML = '';
        const totalPages = Math.ceil(totalItems / (transactions.length > 0 ? transactions.length : 1)); // Dummy calculation
        paginationInfo.textContent = `Hiển thị 1-${totalItems} trong tổng số ${totalItems} kết quả`; // Dummy info

        // Create dummy page items for UI, but no click listeners
        if (totalPages > 1) {
             const createDummyPageItem = (text) => {
                const li = document.createElement('li');
                li.classList.add('inline-block');
                const a = document.createElement('a');
                a.href = '#';
                a.classList.add('py-2', 'px-3', 'border', 'border-gray-300', 'rounded-md', 'bg-white', 'text-gray-700', 'opacity-50', 'cursor-not-allowed');
                a.textContent = text;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    disabledFeatureAlert('Phân trang');
                });
                li.appendChild(a);
                return li;
            };
            paginationList.appendChild(createDummyPageItem('Trước'));
            paginationList.appendChild(createDummyPageItem('1'));
            if (totalPages > 1) paginationList.appendChild(createDummyPageItem('2'));
            if (totalPages > 2) paginationList.appendChild(createDummyPageItem('...'));
            paginationList.appendChild(createDummyPageItem('Tiếp'));
        }
    };

    // Disable Search functionality
    searchTransactionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        disabledFeatureAlert('Tìm kiếm');
    });
    transactionSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            disabledFeatureAlert('Tìm kiếm');
        }
    });

    // Disable Items per page change
    itemsPerPageSelect.addEventListener('change', (event) => {
        disabledFeatureAlert('Thay đổi số lượng mục hiển thị');
        // Reset select to its current value if you want to prevent actual change
        event.target.value = 10; // Or whatever default you want to visually keep
    });

    // Disable Sort table columns
    sortIcons.forEach(icon => {
        icon.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            disabledFeatureAlert('Sắp xếp');
        });
    });

    // Disable Select All Checkbox logic
    selectAllCheckbox.addEventListener('change', () => {
        // Visually toggle but don't perform actual selection logic
        disabledFeatureAlert('Chọn tất cả');
        selectAllCheckbox.checked = false; // Always uncheck immediately
        selectAllCheckbox.indeterminate = false;
    });

    // Disable Delete Selected Records button
    deleteSelectedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        disabledFeatureAlert('Xóa các bản ghi đã chọn');
    });

    // Dummy table-specific event listeners (edit/delete/view single row)
    const attachDummyTableEventListeners = () => {
        transactionTableBody.querySelectorAll('button[title="Sửa"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                disabledFeatureAlert('Sửa giao dịch');
            });
        });

        transactionTableBody.querySelectorAll('button[title="Xem"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                disabledFeatureAlert('Xem chi tiết giao dịch');
            });
        });

        transactionTableBody.querySelectorAll('button[title="Xóa"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                disabledFeatureAlert('Xóa giao dịch');
            });
        });

        transactionTableBody.querySelectorAll('.transaction-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                e.preventDefault(); // Prevent actual state change
                disabledFeatureAlert('Chọn giao dịch');
                checkbox.checked = false; // Ensure it visually stays unchecked
            });
        });
    };

    // Disable Confirmation Modal buttons (if triggered by any legacy code)
    cancelConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(confirmationModal);
        disabledFeatureAlert('Xác nhận (Hủy)');
    });
    confirmActionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(confirmationModal);
        disabledFeatureAlert('Xác nhận');
    });

    // Initial render when page loads
    hideModal(addTransactionModal);
    hideModal(confirmationModal);
    filterAndRenderTransactions(); // This will call the simplified renderTable
});