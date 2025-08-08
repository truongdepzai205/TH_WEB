import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Table from "./components/Table";
import AddStudentModal from "./components/AddStudentModal";
import Footer from "./components/Footer";
import ControlPanel from "./components/ControlPanel";
import Pagination from "./components/Pagination";
import studentsData from "./data";

function App() {
  const [students, setStudents] = useState(studentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAddStudent = (newStudent) => {
    const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    setStudents([
      ...students,
      { ...newStudent, id: newId },
    ]);
    setIsModalOpen(false);
    
    setAlertMessage("Thêm sinh viên thành công!");
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <ControlPanel onAddClick={() => setIsModalOpen(true)} />
        {alertMessage && <div className="alert-success">{alertMessage}</div>}
        <Table students={students} />
        <Pagination totalItems={students.length} />
      </div>
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddStudent}
      />
      <Footer />
    </div>
  );
}

export default App;