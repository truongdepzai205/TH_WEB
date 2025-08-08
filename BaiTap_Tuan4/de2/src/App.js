import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import AddEmployeeForm from "./components/AddEmployeeForm";
import initialEmployees from "./data";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddEmployee = (newEmployee) => {
    // Tạo ID mới cho nhân viên
    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    const employeeWithId = { ...newEmployee, id: newId };
    setEmployees([employeeWithId,...employees]);
    setIsPopupOpen(false);
  };

  return (
    <div className="app-container">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="header">
        <div className="header-left">
          <h1>TLU</h1>
          <div className="nav">
            <a href="#home">Home</a>
            <a href="#employees">Employees</a>
          </div>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn">Search</button>
        </div>
      </div>
      <div className="main-content">
        {/* Add ToastContainer for notifications */}
        <EmployeeList
          employees={employees}
          onAddClick={() => setIsPopupOpen(true)}
        />
        {isPopupOpen && (
          <AddEmployeeForm
            onAddEmployee={handleAddEmployee}
            onCancel={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;