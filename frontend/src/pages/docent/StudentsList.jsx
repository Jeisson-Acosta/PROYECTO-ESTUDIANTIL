import "../../styles/docent/StudentList.css"
import { HeaderClass } from "../../components/common/classes/HeaderClass.jsx"
import { StudentCard } from "../../components/docent/StudentCard.jsx"
import { BuildTable } from "../../components/common/BuildTable.jsx"

import { useClassDetailsDocent } from "../../hooks/docent/useClassDetailsDocent.js"
import { useCurrentClass } from "../../hooks/docent/useCurrentClass.js"

import { useEffect, useContext, useState } from "react";
import { useRequestDB } from "../../hooks/utils/useRequestDB.js";

import { UserLoginContext } from "../../context/userLogin.jsx";
import toast from "react-hot-toast";

const columnsStudents = [
  {
    header: "Nombre del estudiante",
    accessorKey: "name",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "#E1F5EE", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, color: "#0F6E56"
        }}>
          {row.original.usunom.split(' ')[0][0] + row.original.usunom.split(' ')[1][0]}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14, fontFamily: 'fontSubtitles' }}>{row.original.usunom}</p>
          <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{row.original.usuemail}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Promedio actual",
    accessorKey: "average",
    cell: ({ getValue }) => (
      <span>
        <span style={{ color: "#006859", fontSize: 22, fontFamily: 'fontSubtitles' }}>{getValue()}</span>
        <span style={{ color: "#aaa", fontSize: 14 }}> / 5.0</span>
      </span>
    ),
  },
  {
    header: "Asistencia",
    accessorKey: "attendance",
    cell: ({ getValue }) => <ProgressBar value={getValue()} />,
  },
  {
    header: "Rendimiento",
    accessorKey: "performance",
    cell: ({ getValue }) => <Badge value={getValue()} />,
  },
  {
    header: "Acciones",
    id: "actions",
    cell: () => (
      <div style={{ display: "flex", gap: '22px', alignItems: "center" }}>
        <button style={{ color: "#1D9E75", background: "none", border: "none", cursor: "pointer", fontWeight: 'bold', fontFamily: 'fontSubtitles' }}>
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
            <div style={{background: '#eee', borderRadius: 4, height: 8, width: 80}}>
                <div style={{background: color, height: '100%', borderRadius: 4, width: `${value}%`}}></div>
            </div>
            <span style={{fontSize: 14, fontFamily: 'fontSubtitles'}}>{value}%</span>
        </div>
    )
}

function Badge({ value }) {
    
    const performanceStyles = {
      EXEMPLARY: { background: "#E1F5EE", color: "#0F6E56" },
      STEADY:    { background: "#E6F1FB", color: "#185FA5" },
      "AT RISK": { background: "#FCEBEB", color: "#A32D2D" }
    }
    const style = performanceStyles[value] || {}

    return (
      <span style={{...style, padding: '5px 14px', borderRadius: 10, fontSize: 11, fontWeight: 'bold', fontFamily: 'fontSubtitles'}}>
        {value === 'AT RISK' ? 'En Riesgo' : value === 'STEADY' ? 'Estable' : 'Ejemplar'}
      </span>
    )
}


export function StudentsList() {
    const [students, setStudents] = useState([])
    const [viewListStudents, setViewListStudents] = useState('list')
    const { userLogin } = useContext(UserLoginContext)
    const { infoClass } = useClassDetailsDocent()
    const { currentClass } = useCurrentClass()
    const { requestDB } = useRequestDB()

    useEffect(() => {

        const getListStudents = async () => {
          const responseDB = await requestDB(`docent/students-list/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${currentClass.asgcod}/LSC`)
          if (!responseDB.ok) return toast.error(responseDB.message)
          setStudents(responseDB.data[0].result)
        }
        getListStudents()
    }, [])

    if (infoClass.infoClass === null) return null

    return (
        <section className="container-students-list-docent">
            <HeaderClass infoClass={infoClass.infoClass[0]} />
            <div className="actions-to-list-students">
                <div>
                    <input 
                        type="text" 
                        placeholder="Filtrar por nombre de estudiante"
                    />
                </div>
                <div className="options-to-view-list-students">
                    <button 
                        className={viewListStudents === 'list' ? 'active' : ''}
                        onClick={() => setViewListStudents('list')}
                    >
                        Lista
                    </button>
                    <button 
                        className={viewListStudents === 'grid' ? 'active' : ''}
                        onClick={() => setViewListStudents('grid')}
                    >
                        Cuadrícula
                    </button>
                </div>
            </div>
            {students === null && (
                <h2 style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'fontSubtitles' }}>Aún no hay estudiantes inscritos en esta clase</h2>
            )}
            {students !== null && viewListStudents === 'list' && (
                <BuildTable columns={columnsStudents} data={students}/>
            )}
            <section className="container-students-grid-docent">
                {students !== null && viewListStudents === 'grid' && (
                    students.map(student => ( <StudentCard key={student.usuid} student={student}/> ))
                )}
            </section>
        </section>
    )
}