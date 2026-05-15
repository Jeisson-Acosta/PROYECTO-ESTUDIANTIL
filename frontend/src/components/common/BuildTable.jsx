import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";

export function BuildTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // initialState: { pagination: { pageSize: 2 } },
  });

  return (
    <div style={{ margin: '20px auto', borderRadius: '16px', overflow: 'hidden' }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{backgroundColor: '#eff1f0'}}>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th key={header.id} style={{
                  textAlign: "left", padding: "20px",
                  fontSize: 12, color: "#4c75a7", fontWeight: 'bold',
                  letterSpacing: 0.5, borderBottom: "1px solid #eee",
                  fontFamily: 'fontTitlesBold'
                }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} style={{ 
              borderBottom: "1px solid #f5f5f5",
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
            }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ padding: "16px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <span style={{ fontSize: 13, color: "#888" }}>
          Showing {students.length} of 28 Students in Mathematics 101
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              style={{
                padding: "4px 10px", borderRadius: 6, border: "1px solid #ddd",
                background: table.getState().pagination.pageIndex === i ? "#1D9E75" : "white",
                color: table.getState().pagination.pageIndex === i ? "white" : "black",
                cursor: "pointer"
              }}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</button>
        </div>
      </div>
      */}
    </div>
  );
}
