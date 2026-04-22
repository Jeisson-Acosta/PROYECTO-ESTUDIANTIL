import { useContext } from "react";
import { CurrentTaskContext } from "../../context/student/currenttask.jsx";

export function useCurrentTask() {
    const context = useContext(CurrentTaskContext)
    if (!context) throw new Error('useCurrentTask must be used within CurrentTaskProvider')
    return context
}

export function deliveryTask() {
    const { currentTask, setCurrentTask } = useCurrentTask()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('usuid', currentTask.usuid)
            formData.append('cedid', currentTask.cedid)
            formData.append('cecid', currentTask.cecid)
            formData.append('astid', currentTask.astid)
            const response = await fetch('http://localhost:3000/api/student/delivery-task', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            setSuccess(true)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {
        file,
        handleFileChange,
        handleSubmit,
        loading,
        error,
        success
    }
}