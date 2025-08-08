// src/App.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { fetchContactsData } from './data.js';
import { User, Search, X } from 'lucide-react';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchContactsData();
        setContacts(data);
        showAlert('Tải thành công!', 'success');
      } catch {
        showAlert('Lỗi khi tải', 'error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function showAlert(msg, type) {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  }

  function handleAdd(contact) { setContacts(prev=>[...prev,{ id:Date.now(), ...contact }]); showAlert(`Đã thêm ${contact.name}`,'success'); }
  function handleUpdate(upd) { setContacts(prev=>prev.map(c=>c.id===upd.id?upd:c)); setEditing(null); showAlert(`Đã cập nhật ${upd.name}`,'success'); }
  function handleDelete(id) { const c=contacts.find(c=>c.id===id); setContacts(prev=>prev.filter(c=>c.id!==id)); showAlert(`Đã xóa ${c.name}`,'success'); }
  function handleToggle(id) { setContacts(prev=>prev.map(c=>c.id===id?{...c,favorite:!c.favorite}:c)); }

  return (
    
    <div className="app">
        
      <header className="app-header">
        <div className="brand"><User size={32}/> <h1>ContactHub</h1></div>
        <div className="search-bar"><Search size={20}/> <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm kiếm..."/></div>
      </header>
      {alert && <div className={`alert alert-${alert.type}`}><span>{alert.msg}</span><button onClick={()=>setAlert(null)}><X size={16}/></button></div>}
      <main className="main-container">
        <aside><ContactForm onAddContact={handleAdd} onUpdateContact={handleUpdate} editingContact={editing} onCancelEdit={()=>setEditing(null)}/></aside>
        <section><ContactList contacts={contacts} onEdit={setEditing} onDelete={handleDelete} onToggleFavorite={handleToggle} isLoading={loading} searchTerm={search}/></section>
      </main>
      <footer><p>&copy; 2025 ContactHub</p></footer>
    </div>
  );
}