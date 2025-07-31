// data.js
const initialTransactions = [

    {
        id: "1515",
        customerName: "Hoàng Minh Long",
        employeeName: "Nguyễn Văn Hùng",
        amount: 810000,
        purchaseDate: "13 Tháng 8 2024 12:30"
    },
    {
        id: "1516",
        customerName: "Nguyễn Hữu Trí",
        employeeName: "Mai Thục Anh",
        amount: 270000,
        purchaseDate: "14 Tháng 8 2024 14:00"
    },
    {
        id: "1517",
        customerName: "Phạm Thị Loan",
        employeeName: "Lê Thị Lan",
        amount: 690000,
        purchaseDate: "14 Tháng 8 2024 15:00"
    },
    {
        id: "1518",
        customerName: "Trần Văn Việt",
        employeeName: "Vũ Đức Hiếu",
        amount: 400000,
        purchaseDate: "15 Tháng 8 2024 09:00"
    },
    {
        id: "1519",
        customerName: "Lê Văn An",
        employeeName: "Nguyễn Văn Hùng",
        amount: 530000,
        purchaseDate: "15 Tháng 8 2024 10:15"
    },
    {
        id: "1520",
        customerName: "Đinh Thị Hồng",
        employeeName: "Mai Thục Anh",
        amount: 750000,
        purchaseDate: "16 Tháng 8 2024 11:30"
    }
];

// Biến này sẽ được sử dụng trong script.js để thao tác
let transactions = [...initialTransactions];