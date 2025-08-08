// src/components/Pagination.js
import React from 'react';
import '../App.css';

const Pagination = ({ totalItems, itemsPerPage = 4, currentPage = 1 }) => {
  // Add a safety check to ensure totalItems is a non-negative number
  const safeTotalItems = totalItems > 0 ? totalItems : 0;
  
  const totalPages = Math.ceil(safeTotalItems / itemsPerPage);
  
  // Handle the case where totalPages might be 0 or NaN
  const pages = totalPages > 0 ? [...Array(totalPages).keys()].map(i => i + 1) : [];

  return (
    <div className="pagination-container">
      <div className="pagination-buttons">
        <button>&lt;</button>
        {pages.map(page => (
          <button key={page} className={page === currentPage ? 'active' : ''}>
            {page}
          </button>
        ))}
        <button>&gt;</button>
      </div>
      <div>
        Kết quả {safeTotalItems > 0 ? '1' : '0'} trong {totalPages} trang
      </div>
    </div>
  );
};

export default Pagination;