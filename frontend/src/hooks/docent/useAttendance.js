import { useContext, useEffect, useState } from "react"
import { UserLoginContext } from "../../context/userLogin"
import { useCurrentClass } from "./useCurrentClass"
import { useRequestDB } from "../utils/useRequestDB"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

export function useAttendance() {
    const [selectedDate, setSelectedDate] = useState(() => {
        const d = new Date()
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    })
    const [attendance, setAttendance] = useState([])
    const [listStudents, setListStudents] = useState(null)   
    const { userLogin } = useContext(UserLoginContext)
    const { currentClass } = useCurrentClass()
    const { requestDB } = useRequestDB()
    
    // Este efecto maneja toda la logica cuando cambia la fecha seleccionada.
        // 1. Prmero consulta si existe la asistencia en la fecha seleccionada.
        // 2. Si no existe una asistencia guardada,trae la lista de estudiantes para agregar asistencia.
    useEffect(() => {
        const fetchAttendanceData = async () => {
            setListStudents(null)
            const dateToFetch = selectedDate

            const responseDB = await requestDB(`docent/attendance-students/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${currentClass.asgcod}/${dateToFetch}`)            
            if (!responseDB.ok) return toast.error(responseDB.message)

            if (responseDB.data[0].all_quantity_students > 0) {
                const studentsWithStatus = responseDB.data[0].students
                const newAttendance = studentsWithStatus.map(att => ({ usuid: att.usuid, status: att.status }))
                
                setAttendance(newAttendance)
                setListStudents(studentsWithStatus)
            } else {
                const responseStudents = await requestDB(`docent/students-list/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${currentClass.asgcod}/LSA`)
                if (!responseStudents.ok) return toast.error(responseStudents.message)
                setAttendance([]) // Limpiamos la asistencia ya que es ua nueva
                setListStudents(responseStudents.data[0].result)
            }
        }
        
        fetchAttendanceData()
    }, [selectedDate])

    const handleClickButtonStatus = (event, status, usuid) => {

        setAttendance((prev) => {
            const existsStudent = prev.find(student => student.usuid === usuid)

            if (existsStudent) {
                return prev.map(att =>
                    att.usuid === usuid ? { ...att, status: status } : att
                )
            } else {
                return [...prev, { usuid: usuid, status: status }]
            }
        })    
    }

    const markAllPresent = () => {
        if (!listStudents) return

        const allStudentsPresent = listStudents.map(student => ({
            usuid: student.usuid,
            status: 'P'
        }))

        setAttendance(allStudentsPresent)
    }

    const handleClickSaveAttendance = async () => {

        const dataToSend = {
            usuid: String(userLogin.userInfo.usuid),
            cedid: String(userLogin.educativeCenterInfo[0].cedid),
            cecid: String(userLogin.currentCycleInfo.cecid),
            asgcod: currentClass.asgcod,
            date: selectedDate,
            data: JSON.stringify(attendance)
        }

        const responseDB = await requestDB('docent/save-attendance', 'POST', dataToSend)
        if (!responseDB.ok) return toast.error(responseDB.message)

        toast.success('Asistencia guardada exitosamente.')
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
    }

    return {
        attendance,
        listStudents,
        selectedDate,
        setSelectedDate,
        handleClickButtonStatus,
        markAllPresent,
        handleClickSaveAttendance
    } 
 
}
