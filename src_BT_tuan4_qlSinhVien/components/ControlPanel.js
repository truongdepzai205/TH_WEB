import React from 'react';
import '../App.css';

const ControlPanel = ({ onAddClick }) => {
    return (
        <div className="control-panel">
            <div className="actions">
                <button className="add-button" onClick={onAddClick}>
                    <span>+</span> THÊM MỚI
                </button>
                <button className="export-button">
                    <span className="export-icon">📄</span> XUẤT RA FILE
                </button>
            </div>
            <div className="search-and-filter">
                <div className="search-box">
                    <input type="text" placeholder="Tìm kiếm theo Tên" />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="filter-box">
                    <span>Kết quả</span>
                    <select>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;