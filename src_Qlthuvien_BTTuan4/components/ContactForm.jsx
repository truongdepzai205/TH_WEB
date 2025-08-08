// src/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Edit, UserPlus, Save, X } from 'lucide-react';

export default function ContactForm({ onAddContact, onUpdateContact, editingContact, onCancelEdit }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingContact) {
      setFormData({ name: editingContact.name, phone: editingContact.phone, email: editingContact.email });
    } else {
      setFormData({ name: '', phone: '', email: '' });
    }
    setErrors({});
  }, [editingContact]);

  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Họ tên không được để trống';
    else if (formData.name.trim().length > 30) newErrors.name = 'Họ tên không được quá 30 ký tự';
    const phoneRegex = /^0\d{9}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại không được để trống';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Số điện thoại phải có 10 số và bắt đầu bằng 0';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email không được để trống';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email không đúng định dạng';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const payload = { ...formData };
    if (editingContact) {
      onUpdateContact({ ...editingContact, ...payload });
    } else {
      onAddContact({
        ...payload,
        avatar: '',
        favorite: false
      });
    }
    setFormData({ name: '', phone: '', email: '' });
    setIsLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  return (
    <form className="contact-form-wrapper" onSubmit={handleSubmit}>
      <div className="contact-form-card">
        <div className="form-header">
          <div className="form-header-content">
            {editingContact ? (
              <><Edit size={24} /> <div><h3>Chỉnh sửa liên hệ</h3><p>Cập nhật thông tin liên hệ</p></div></>
            ) : (
              <><UserPlus size={24} /> <div><h3>Thêm liên hệ mới</h3><p>Tạo một liên hệ mới trong danh bạ</p></div></>
            )}
          </div>
        </div>
        <div className="form-body">
  <div className="input-group">
    <label className="floating-label">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`floating-input ${errors.name ? 'error' : ''}`}
        placeholder=" "
        maxLength={30}
      />
      <span className="floating-text">
        <User size={16} className="input-icon" />
        Họ và tên
      </span>
    </label>
    {errors.name && <span className="error-message">{errors.name}</span>}
  </div>

  <div className="input-group">
    <label className="floating-label">
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={`floating-input ${errors.phone ? 'error' : ''}`}
        placeholder=" "
        maxLength={10}
      />
      <span className="floating-text">
        <Phone size={16} className="input-icon" />
        Số điện thoại
      </span>
    </label>
    {errors.phone && <span className="error-message">{errors.phone}</span>}
  </div>

  <div className="input-group">
    <label className="floating-label">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`floating-input ${errors.email ? 'error' : ''}`}
        placeholder=" "
      />
      <span className="floating-text">
        <Mail size={16} className="input-icon" />
        Địa chỉ email
      </span>
    </label>
    {errors.email && <span className="error-message">{errors.email}</span>}
  </div>
</div>
        <div className="form-actions">
          <button type="submit" className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : <Save size={18} />} 
            <span>{editingContact ? 'Cập nhật' : 'Thêm mới'}</span>
          </button>
          {editingContact && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              <X size={18} /><span>Hủy bỏ</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}