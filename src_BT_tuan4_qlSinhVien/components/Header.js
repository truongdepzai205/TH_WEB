import React from 'react';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <div className="brand">Trường Đại học Thủy Lợi</div>
      <ul className="nav-links">
        <li><a href="#home">Trang chủ</a></li>
        <li><a href="#manage">Quản lý sinh viên</a></li>
      </ul>
      <div className="search-container">
        <input type="search" placeholder="Nhập nội dung tìm kiếm" />
        <button>Tìm kiếm</button>
      </div>
    </header>
  );
};

export default Header;