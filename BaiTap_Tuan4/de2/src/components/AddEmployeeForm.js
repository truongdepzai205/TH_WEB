import React, { useState } from "react";
import "../App.css";
import { toast } from 'react-toastify';

const AddEmployeeForm = ({ onAddEmployee, onCancel }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!employeeData.name) newErrors.name = "Tên không được để trống";
    if (!employeeData.email) newErrors.email = "Email không được để trống";
    if (!employeeData.address) newErrors.address = "Địa chỉ không được để trống";

    // Validate phone number
    const phoneRegex = /^0\d{9}$/;
    if (!employeeData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(employeeData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 kí tự và bắt đầu bằng 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAddEmployee(employeeData);
      toast.success("Thêm nhân viên thành công!"); 
      setEmployeeData({ name: "", email: "", address: "", phone: "" });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <h3>Add Employee</h3>
          <span className="close-btn" onClick={onCancel}>&times;</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={employeeData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={employeeData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="add-submit-btn">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;