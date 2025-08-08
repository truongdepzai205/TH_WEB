import React from "react";
import TableRow from "./TableRow";
import "../App.css"; // Đảm bảo đã import file CSS

const EmployeeList = ({ employees, onAddClick }) => {
  return (
    <div className="employee-list-container">
      <div className="table-header">
        <h2>Manage Employees</h2>
        <div className="actions">
          <button className="delete-btn">
            <span className="icon-delete"></span> Delete
          </button>
          <button className="add-btn" onClick={onAddClick}>
            <span className="icon-add"></span> Add New Employee
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <TableRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <p>Showing 5 out of 25 entries</p>
        <div className="pagination">
          {/* Pagination logic here, tạm thời cứng */}
          <button>Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;