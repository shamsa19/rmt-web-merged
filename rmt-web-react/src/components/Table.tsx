import React from "react";

interface TableProps {
  headers: string[];
  rows: Array<Array<string | number>>;
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
