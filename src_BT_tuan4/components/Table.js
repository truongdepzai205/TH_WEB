import React from "react";
import '../App.css';

const Table = ({ students }) => {
  if (!Array.isArray(students) || students.length === 0) {
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
            <th>Mã SV</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td><input type="checkbox" /></td>
              <td className="action-buttons">
                <button className="view">👁️‍🗨️</button>
                <button className="edit">✏️</button>
                <button className="delete">🗑️</button>
              </td>
              <td>{index + 1}</td>
              <td>{student.maSV}</td>
              <td>{student.tenSV}</td>
              <td>{student.email}</td>
              <td>{student.ngaySinh}</td>
              <td>{student.gioiTinh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;