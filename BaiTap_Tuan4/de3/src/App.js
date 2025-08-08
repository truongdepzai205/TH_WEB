import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";
import AddEmployeeModal from "./components/AddEmployeeModal";
import Footer from "./components/Footer";
import ControlPanel from "./components/ControlPanel";
import Pagination from "./components/Pagination";
import employeesData from "./data";

function App() {
  const [employees, setEmployees] = useState(employeesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAddEmployee = (newEmployee) => {
    const newId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([
      ...employees,
      { ...newEmployee, id: newId, hoatDong: false },
    ]);
    setIsModalOpen(false);
    
    setAlertMessage("Thêm nhân viên thành công!");
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <ControlPanel onAddClick={() => setIsModalOpen(true)} />
        {alertMessage && <div className="alert-success">{alertMessage}</div>}
        <Table employees={employees} />
        <Pagination totalItems={employees.length} />
      </div>
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEmployee}
      />
      <Footer />
    </div>
  );
}

export default App;