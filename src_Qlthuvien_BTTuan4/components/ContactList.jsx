// src/components/ContactList.jsx
import React from 'react';
import { User, Star, Search } from 'lucide-react';
import ContactItem from './ContactItem';

export default function ContactList({ contacts, onEdit, onDelete, onToggleFavorite, isLoading, searchTerm }) {
  if (isLoading) {
    return (<div className="loading-state"><div className="loading-spinner large"></div><h3>Đang tải danh bạ...</h3></div>);
  }

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const favs = filtered.filter(c => c.favorite);
  const regs = filtered.filter(c => !c.favorite);

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        {searchTerm ? (<><Search size={64}/><h3>Không tìm thấy</h3><p>"{searchTerm}"</p></>) : (<><User size={64}/><h3>Chưa có liên hệ</h3><p>Thêm ngay!</p></>)}
      </div>
    );
  }

  return (
    <div className="contacts-grid">
      {favs.length > 0 && (
        <div className="contacts-group">
          <h3><Star size={18}/> Yêu thích</h3>
          {favs.map(c => <ContactItem key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} onToggleFavorite={onToggleFavorite}/>) }
        </div>
      )}
      {regs.length > 0 && (
        <div className="contacts-group">
          {favs.length>0 && <h3><User size={18}/> Tất cả</h3>}
          {regs.map(c => <ContactItem key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} onToggleFavorite={onToggleFavorite}/>) }
        </div>
      )}
    </div>
  );
}