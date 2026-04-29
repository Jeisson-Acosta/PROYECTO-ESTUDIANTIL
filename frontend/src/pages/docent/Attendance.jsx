import '../../styles/docent/Attendance.css'
import { BuildTable } from "../../components/common/BuildTable.jsx"
import { MessageIcon, SaveIcon } from '../../components/common/GeneralIcons.jsx'
import { ButtonCommon } from '../../components/common/ButtonCommon.jsx'

const STUDENTS_TEST = [
    {
        usuid: 1,
        usunom: 'Jeisson Acosta'
    },
    {
        usuid: 2,
        usunom: 'Angie Martinez'
    },
    {
        usuid: 3,
        usunom: 'Diego garcia'
    },
    {
        usuid: 4,
        usunom: 'Carlos Perez'
    },
    {
        usuid: 5,
        usunom: 'Pepito Perez'
    }
]

const handleClickButton = (event, status, usuid) => {

    event.target.classList.add('selected', 
        status === 'P' 
        ? 'present' 
        : status === 'A' 
            ? 'absent' 
            : status === 'T' 
                ? 'late' : 'excused'
    )
    
}

const columnsTableAttendance = [
    {
        header: 'Estudiante',
        accessorKey: 'name',
        cell: ({ row }) => (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#E1F5EE', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, color: '#0F6E56'
                }}>
                    {row.original.usunom.split(' ')[0][0] + row.original.usunom.split(' ')[1][0]}
                </div>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14, fontFamily: 'fontSubtitles' }}>{row.original.usunom}</p>
            </div>
        )
    },
    {
        header: 'Estado',
        accessorKey: 'status',
        cell: ({ row }) => (
            <div className="container-buttons-status-attendance">
                <button onClick={(event) => handleClickButton(event, 'P', row.original.usuid)}>P</button>
                <button onClick={(event) => handleClickButton(event, 'A', row.original.usuid)}>A</button>
                <button onClick={(event) => handleClickButton(event, 'T', row.original.usuid)}>T</button>
                <button onClick={(event) => handleClickButton(event, 'E', row.original.usuid)}>E</button>
            </div>
        )
    },
    {
        header: 'Observación',
        accessorKey: 'obs',
        cell: () => (
            <button style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer'
            }}
            >
                <MessageIcon />
            </button>
        )
    }
]

export function Attendance() {
    return (
        <section className="principal-container-attendance-docent">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <button className='mark-all-presents'>
                    Marcar todos presentes
                </button>
                <ButtonCommon
                    icon={<SaveIcon />}
                    text={'Guardar Asistencia'}
                 />
            </div>
            <BuildTable 
                columns={columnsTableAttendance}
                data={STUDENTS_TEST}
            />
        </section>
    )
}