import React from "react";
import type { Column } from "./Column";

interface TableProps<T> {
  data: T[];
  columns: readonly Column<T>[];
  renderCell?: (row: T, col: Column<T>) => React.ReactNode;
}

function Table<T extends { email: string }>({ data, columns, renderCell }: TableProps<T>) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} style={{ border: "1px solid #ccc", padding: "4px" }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.email}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                style={{ border: "1px solid #ccc", padding: "4px", textAlign: "center" }}
              >
                {renderCell ? renderCell(row, col) : (row[col.key as keyof T] as any)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
export type { Column };
