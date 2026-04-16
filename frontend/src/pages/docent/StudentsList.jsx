import { HeaderClass } from "../../components/common/classes/HeaderClass.jsx"
import { useClassDetailsDocent } from "../../hooks/docent/useClassDetailsDocent.js"


import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table"


const students = [
  {
    id: 1,
    name: "Mateo Rodriguez",
    email: "mateo.r@academy.edu",
    avatar: "MR",
    average: 4.8,
    attendance: 95,
    performance: "EXEMPLARY",
  },
  {
    id: 2,
    name: "Isabella Chen",
    email: "i.chen@academy.edu",
    avatar: "IC",
    average: 4.2,
    attendance: 82,
    performance: "STEADY",
  },
  {
    id: 3,
    name: "Lucas Varela",
    email: "l.varela@academy.edu",
    avatar: "LV",
    average: 3.5,
    attendance: 68,
    performance: "AT RISK",
  },
  {
    id: 4,
    name: "Sofia Martinez",
    email: "sofia.m@academy.edu",
    avatar: "SM",
    average: 4.9,
    attendance: 100,
    performance: "EXEMPLARY",
  },
];

const styles = {
    EXEMPLARY: { background: "#E1F5EE", color: "#0F6E56" },
    STEADY:    { background: "#E6F1FB", color: "#185FA5" },
    "AT RISK": { background: "#FCEBEB", color: "#A32D2D" },
}

const columns = [
  {
    header: "Student Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "#E1F5EE", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, color: "#0F6E56"
        }}>
          {row.original.avatar}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 500 }}>{row.original.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Current Average",
    accessorKey: "average",
    cell: ({ getValue }) => (
      <span>{getValue()} <span style={{ color: "#aaa", fontSize: 12 }}>/ 5.0</span></span>
    ),
  },
  {
    header: "Attendance",
    accessorKey: "attendance",
    cell: ({ getValue }) => <ProgressBar value={getValue()} />,
  },
  {
    header: "Performance",
    accessorKey: "performance",
    cell: ({ getValue }) => <Badge value={getValue()} />,
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button style={{ color: "#1D9E75", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
          Ver Perfil
        </button>
        <button style={{ border: "1px solid #ddd", borderRadius: 6, padding: "4px 8px", background: "none", cursor: "pointer" }}>
          ✉
        </button>
      </div>
    ),
  },
];

function ProgressBar({ value }) {
    const color = value >= 80 ? '#1D9E75' : value >= 70 ? '#EF9F27' : '#E24B4A'
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{background: '#eee', borderRadius: 4, height: 6, width: 80}}>
                <div style={{background: color, height: '100%', borderRadius: 4, width: `${value}%`}}></div>
            </div>
            <span style={{fontSize: 13}}>{value}%</span>
        </div>
    )
}

function Badge({ value }) {
    const style = styles[value] || {}
    return (
        <span style={{...style, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500}}>
            {value}
        </span>
    )
}

function StudentTable() {

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 2 } },
  });

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, backgroundColor: "#fff" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{backgroundColor: '#eff1f0'}}>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(header => (
                <th key={header.id} style={{
                  textAlign: "left", padding: "10px 16px",
                  fontSize: 11, color: "#888", fontWeight: 600,
                  letterSpacing: 0.5, borderBottom: "1px solid #eee"
                }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ padding: "16px" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
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
    </div>
  );
}

export function StudentsList() {
    const { infoClass } = useClassDetailsDocent()
    if (infoClass.infoClass === null) return null

    console.log(infoClass)
    return (
        <section className="container-students-list-docent">
            <HeaderClass infoClass={infoClass.infoClass[0]} />
            <StudentTable />
        </section>
    )
}