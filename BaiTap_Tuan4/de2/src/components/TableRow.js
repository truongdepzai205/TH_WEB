import React from "react";

const TableRow = ({ employee }) => {
  return (
    <tr>
      <td><input type="checkbox" /></td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.address}</td>
      <td>({employee.phone.substring(0, 3)}) {employee.phone.substring(3, 6)}-{employee.phone.substring(6)}</td>
      <td className="table-actions">
        <span className="action-icon icon-edit"></span>
        <span className="action-icon icon-delete"></span>
      </td>
    </tr>
  );
};

export default TableRow;