import { useEffect, useState, useContext } from 'react'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { useTitleHeaderOption } from '../../hooks/common/useTitleHeaderOption.js'

import '../../styles/rector/FormCreateDocent.css'
import { LockIcon, UserCheckIcon, UserIcon } from "../common/GeneralIcons.jsx"

import { UserLoginContext } from '../../context/userLogin.jsx'
import { IconHatStudent } from "../common/IconsLayout"

import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

export function FormCreateDocent() {

    const [courses, setCourses] = useState(null)
    const [formData, setFormData] = useState({
        usunom: '',
        usudocu: '',
        tidcod: '',
        usufch_nacimiento: '',
        usuemail: '',
        usucel: '',
        edccod: '',
        usupwd: '',
        usupwd_confirm: ''
    })
    const { requestDB } = useRequestDB()
    const { userLogin } = useContext(UserLoginContext)
    const { setTitleHeaderOption } = useTitleHeaderOption()

    useEffect(() => {
        setTitleHeaderOption('Crear Docente')
        const getCourses = async () => {
            const response = await requestDB(`rector/courses-by-educative-center/${userLogin.educativeCenterInfo[0].cedid}`, 'GET', null)
            if (!response.ok) return toast.error(response.message)
            setCourses(response.data[0].courses)
        }
        getCourses()
    }, [])

    const handleChangeFormData = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        const studentData = {
            ...formData,
            usuid: String(userLogin.userInfo.usuid),
            cedid: String(userLogin.educativeCenterInfo[0].cedid),
            cecid: String(userLogin.currentCycleInfo.cecid),
            // usufch_nacimiento: new Date(formData.usufch_nacimiento).toISOString().split('T')[0],
        }

        if (formData.usupwd !== formData.usupwd_confirm) return toast.error('Las contraseñas no coinciden')

        const response = await requestDB('rector/create-student', 'POST', studentData)
        if (!response.ok) return toast.error(response.message)
        toast.success('Docente creado exitosamente')

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })

        setFormData({
            usunom: '',
            usudocu: '',
            tidcod: '',
            usufch_nacimiento: '',
            usuemail: '',
            usucel: '',
            edccod: '',
            usupwd: '',
            usupwd_confirm: ''
        })
    }

    console.log(formData)

    return (
        <section className="principal-container-create-docent">
            <header className="header-create-docent">
                <p>
                    Completa el formulario para crear un nuevo perfil de docente y asignar sus credenciales.
                </p>
            </header>
            <form className="form-create-docent" onSubmit={handleSubmitForm}>
                <section className="personal-info-docent">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <UserIcon />
                        </div>
                        <div className="title-container">
                            <h3>
                                Informacion Personal
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="usunom">Nombre Completo</label>
                            <input 
                                type="text" 
                                id="usunom" 
                                name="usunom" 
                                placeholder="Ej: Roberto Martinez Gomez" 
                                value={formData.usunom}
                                onChange={handleChangeFormData}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="tidcod">Tipo de documento</label>
                            <select 
                                id="tidcod" 
                                name="tidcod" 
                                value={formData.tidcod}
                                onChange={handleChangeFormData}
                            >
                                <option value="">Seleccione un tipo de documento</option>
                                <option value="CC">Cedula de Ciudadania</option>
                                <option value="TI">Tarjeta de Identidad</option>
                                <option value="PPT">Pasaporte</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="usudocu">Numero de Documento</label>
                            <input 
                                type="text" 
                                id="usudocu" 
                                name="usudocu" 
                                placeholder="Ej: 123456789" 
                                value={formData.usudocu}
                                onChange={handleChangeFormData}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usufch_nacimiento">Fecha de nacimiento</label>
                            <input 
                                type="date" 
                                id="usufch_nacimiento" 
                                name="usufch_nacimiento" 
                                value={formData.usufch_nacimiento}
                                onChange={handleChangeFormData}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usuemail">Correo Electronico</label>
                            <input 
                                type="email" 
                                id="usuemail" 
                                name="usuemail" 
                                placeholder="nombre@dominio.com" 
                                value={formData.usuemail}
                                onChange={handleChangeFormData}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usucel">Telefono</label>
                            <input 
                                type="text" 
                                id="usucel" 
                                name="usucel" 
                                placeholder="Ej: 3123456789" 
                                value={formData.usucel}
                                onChange={handleChangeFormData}
                            />
                        </div>
                    </div>
                </section>
                <section className="academic-info-docent">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <IconHatStudent />
                        </div>
                        <div className="title-container">
                            <h3>
                                Informacion Academica
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="edccod">Curso(s)</label>
                            <select 
                                id="edccod" 
                                name="edccod" 
                                value={formData.edccod}
                                onChange={handleChangeFormData}
                            >
                                <option value="">Seleccione un curso</option>
                                {courses && courses.map(course => (
                                    <option key={course.edccod} value={course.edccod}>
                                        {course.edcnom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>
                <section className="account-security-student">
                    <header className="header-section-form">
                        <div className="icon-container">
                            <LockIcon />
                        </div>
                        <div className="title-container">
                            <h3>
                                Seguridad de la Cuenta
                            </h3>
                        </div>
                    </header>
                    <div className="container-form-inputs">
                        <div className="input-group">
                            <label htmlFor="usupwd">Contraseña</label>
                            <input 
                                type="password" 
                                id="usupwd" 
                                name="usupwd" 
                                placeholder="*********" 
                                value={formData.usupwd}
                                onChange={handleChangeFormData}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="usupwd_confirm">Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                id="usupwd_confirm" 
                                name="usupwd_confirm" 
                                placeholder="*********" 
                                value={formData.usupwd_confirm}
                                onChange={handleChangeFormData}
                            />
                        </div>
                    </div>
                </section>
                <footer className="footer-form-create-docent">
                    <div className="buttons-actions">
                        <button className="btn-cancel-form">
                            Cancelar
                        </button>
                        <button className="btn-submit-form">
                            <UserCheckIcon />
                            Registrar Docente
                        </button>
                    </div>
                </footer>
            </form>
        </section>
    )
}