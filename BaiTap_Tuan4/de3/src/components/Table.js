import React from "react";
import '../App.css';

const Table = ({ employees }) => {
  // Thêm kiểm tra an toàn để đảm bảo props employees là một mảng
  if (!Array.isArray(employees) || employees.length === 0) {
    return (
        <div className="table-container">
          <p style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu để hiển thị.</p>
        </div>
      );
  }
  
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Hành động</th>
            <th>STT</th>
            <th>Tên</th>
            <th>Họ đệm</th>
            <th>Địa chỉ</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td><input type="checkbox" /></td>
              <td className="action-buttons">
                <button className="view">👁️‍🗨️</button>
                <button className="edit">✏️</button>
                <button className="delete">🗑️</button>
              </td>
              <td>{index + 1}</td>
              <td>{employee.ten}</td>
              <td>{employee.hoDem}</td>
              <td>{employee.diaChi}</td>
              <td>{employee.hoatDong ? "✔️" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;