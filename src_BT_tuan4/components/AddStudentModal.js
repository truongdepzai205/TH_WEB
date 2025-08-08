import React, { useState } from "react";
import '../App.css';

const AddStudentModal = ({ isOpen, onClose, onAdd }) => {
  const [maSV, setMaSV] = useState("");
  const [tenSV, setTenSV] = useState("");
  const [email, setEmail] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!maSV || !tenSV || !email || !ngaySinh || !gioiTinh) {
      setError("Vui lòng điền đầy đủ các trường thông tin.");
      return;
    }
    
    if (!validateEmail(email)) {
        setError("Email không hợp lệ.");
        return;
    }

    if (maSV.length > 10) {
      setError("Mã sinh viên không được quá 10 ký tự.");
      return;
    }

    if (tenSV.length > 20) {
      setError("Tên không được quá 20 ký tự.");
      return;
    }

    const newStudent = {
      maSV,
      tenSV,
      email,
      ngaySinh,
      gioiTinh,
    };
    onAdd(newStudent);
    setMaSV("");
    setTenSV("");
    setEmail("");
    setNgaySinh("");
    setGioiTinh("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thêm Sinh viên</h3>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Mã SV</label>
            <input type="text" value={maSV} onChange={(e) => setMaSV(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tên</label>
            <input type="text" value={tenSV} onChange={(e) => setTenSV(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ngày sinh</label>
            <input type="date" value={ngaySinh} onChange={(e) => setNgaySinh(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select>
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

export default AddStudentModal;