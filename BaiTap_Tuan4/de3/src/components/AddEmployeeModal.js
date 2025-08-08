import React, { useState } from "react";
import '../App.css';

const AddEmployeeModal = ({ isOpen, onClose, onAdd }) => {
  const [ten, setTen] = useState("");
  const [hoDem, setHoDem] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!ten || !hoDem || !diaChi) {
      setError("Vui lòng điền đầy đủ các trường thông tin.");
      return;
    }

    if (ten.length > 15) {
      setError("Tên không được quá 15 ký tự.");
      return;
    }

    if (hoDem.length > 20) {
      setError("Họ đệm không được quá 20 ký tự.");
      return;
    }

    if (diaChi.length > 50) {
      setError("Địa chỉ không được quá 50 ký tự.");
      return;
    }

    const newEmployee = {
      ten,
      hoDem,
      diaChi,
    };
    onAdd(newEmployee);
    setTen("");
    setHoDem("");
    setDiaChi("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thêm Nhân viên</h3>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Tên</label>
            <input type="text" value={ten} onChange={(e) => setTen(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Họ đệm</label>
            <input type="text" value={hoDem} onChange={(e) => setHoDem(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>Hủy</button>
            <button type="submit" className="add-submit-button">Thêm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;