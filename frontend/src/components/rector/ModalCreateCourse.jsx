import { useState, useEffect } from "react"
import { useRequestDB } from "../../hooks/utils/useRequestDB.js"
import { CloseIcon } from "../common/GeneralIcons.jsx"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

export function ModalCreateCourse({ onClose, usuid, cedid, cecid }) {
    const [docents, setDocents] = useState([])
    const [form, setForm] = useState({
        edcnom: '',
        edccod: '',
        usuid_docent: ''
    })
    const { requestDB } = useRequestDB()

    const handleChangeInfo = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleClickCancelInfo = () => {
        setForm({
            edcnom: '',
            edccod: '',
            usuid_docent: ''
        })
    }

    const handleClickSaveInfo = async () => {
        const dataToSend = {
            usuid: String(usuid),
            cedid: String(cedid),
            cecid: String(cecid),
            edccod: form.edccod,
            edcnom: form.edcnom,
            usuid_docente: String(form.usuid_docent)
        }
        const resultDB = await requestDB('rector/create-course', 'POST', dataToSend)
        if (!resultDB.ok) return toast.error(resultDB.message)
        toast.success('Curso creado exitosamente')
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
        onClose()
    }

    useEffect(() => {
        const getAllDocents = async () => {
            const resultDB = await requestDB(`rector/all-docents/${cedid}`, 'GET')
            if (!resultDB.ok) return toast.error(resultDB.message)
            setDocents(resultDB.data[0].docents)
        }
        getAllDocents()
    }, [])

    if (docents.length === 0) return null

    return (
        <section className="principal-container-modal-create-course">
            <div className="container-modal-create-course">
                <header className="header-modal-create-course">
                    <div>
                        <h2 
                            style={{
                                fontFamily: 'fontTitlesBold', 
                                color: '#0d1422', 
                                fontSize: '24px', 
                                margin: 0
                            }}
                        >
                            Crear Nuevo Curso
                        </h2>
                        <p 
                            style={{
                                fontFamily: 'fontSubtitles', 
                                color: '#4c79a0', 
                                fontSize: '14px', 
                                margin: 0
                            }}
                        >
                            Crea un nuevo curso para tu centro educativo.
                        </p>
                    </div>
                    <button 
                        className='button-close-modal-create-course'
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </header>
                <section className="fields-create-course">
                    <div style={{display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap'}}>
                        <label htmlFor="edcnom">
                            NOMBRE DEL CURSO
                            <input 
                                type="text" 
                                id='edcnom' 
                                name='edcnom'
                                placeholder='EJ: Matemáticas Avanzadas' 
                                style={{flex: '1'}}
                                value={form.edcnom}
                                onChange={handleChangeInfo}
                                onBlur={() => setForm({...form, edccod: form.edcnom.trim().slice(0, 3).toUpperCase()})}
                            />
                        </label>

                        <label htmlFor="edccod">
                            CODIGO IDENTIFICADOR
                            <input 
                                type="text" 
                                id='edccod' 
                                disabled
                                name='edccod'
                                style={{flex: '1'}}
                                value={form.edccod}
                                onChange={handleChangeInfo}
                            />
                        </label>

                    </div>
                    <div className='container-select-docent'>
                        <label htmlFor="usuid_docent">
                            Docente Titular (Director de Curso)
                        </label>
                        <select name="usuid_docent" id="usuid_docent" value={form.usuid_docent} onChange={handleChangeInfo}>
                            <option value="" disabled>Seleccione un docente</option>
                            {docents.map((docent) => (
                                <option key={docent.usuid} value={docent.usuid}>{docent.usunom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="buttons-actions-create-course">
                        <button className='btn-cancel' onClick={handleClickCancelInfo}>
                            Cancelar
                        </button>
                        <button className='btn-save' onClick={handleClickSaveInfo}>
                            Guardar
                        </button>
                    </div>
                </section>
            </div>
        </section>
    )
}
