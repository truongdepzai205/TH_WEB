// src/components/ContactItem.jsx
import React, { useState } from 'react';
import { Phone, Mail, Edit, Trash2, Heart } from 'lucide-react';

export default function ContactItem({ contact, onEdit, onDelete, onToggleFavorite }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${contact.name}"?`)) {
      setIsDeleting(true);
      await new Promise(r => setTimeout(r, 300));
      onDelete(contact.id);
    }
  }

  return (
    <div className={`contact-card ${isDeleting ? 'deleting' : ''}`}>
      <div className="contact-avatar">
        {contact.avatar ? (
          <img src={contact.avatar} alt={contact.name} onError={e => { e.target.style.display='none'; }} />
        ) : (
          <div className="avatar-fallback">{contact.name.charAt(0).toUpperCase()}</div>
        )}
        <button className={`favorite-btn ${contact.favorite ? 'active' : ''}`} onClick={() => onToggleFavorite(contact.id)}>
          <Heart size={16} fill={contact.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="contact-info">
        <h4>{contact.name}</h4>
        <div className="contact-detail"><Phone size={14} /><span>{contact.phone}</span></div>
        <div className="contact-detail"><Mail size={14} /><span>{contact.email}</span></div>
      </div>
      <div className="contact-actions">
        <button onClick={() => onEdit(contact)} title="Chỉnh sửa"><Edit size={16} /></button>
        <button onClick={handleDelete} disabled={isDeleting} title="Xóa">
          {isDeleting ? <div className="mini-spinner"></div> : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  );
}