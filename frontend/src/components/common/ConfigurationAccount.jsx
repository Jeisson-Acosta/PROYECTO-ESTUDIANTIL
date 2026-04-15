import '../../styles/common/ConfigurationAccount.css'
import { UserIcon } from "./GeneralIcons"
import { useState, useRef, useContext, useEffect } from "react"
import { ButtonCommon } from "./ButtonCommon.jsx"
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import toast from 'react-hot-toast'
import { UserLoginContext } from '../../context/userLogin.jsx'

export function ConfigurationAccount() {
    const [infoUser, setInfoUser] = useState({
        usunom: '',
        usuemail: '',
        usudocu: '',
        usufch_nacimiento: '',
        usucel: '',
        usufoto_perfil: null
    })
    const [selectedOption, setSelectedOption] = useState('perfil')
    const [previewPhoto, setPreviewPhoto] = useState(null)
    const refUploadPhoto = useRef(null)
    const { requestDB } = useRequestDB()
    const { userLogin } = useContext(UserLoginContext)

    const handleChangeInfoUser = (e) => {
        const { name, value } = e.target
        setInfoUser(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleClickSaveChanges = async () => {
        if (!infoUser.usunom || !infoUser.usuemail || !infoUser.usudocu || !infoUser.usufch_nacimiento || !infoUser.usucel) {
            toast.error('Todos los campos son obligatorios')
            return
        }
        /* const result = await requestDB('config-account/update-info-user', 'PUT', infoUser)
        if (!result.ok) {
            toast.error(result.message)
            return
        }
        toast.success(result.message) */
    }

    useEffect(() => {
        const getInfoUser = async () => {
            const result = await requestDB('config-account/info-user', 'GET', null)
            if (!result.ok) {
                toast.error(result.message)
                return
            }
            setInfoUser(result.data[0])
            if (result.data[0].usufoto_perfil) {
                setPreviewPhoto(result.data[0].usufoto_perfil)
            }
        }
        getInfoUser()
    }, [])

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setPreviewPhoto(URL.createObjectURL(file))

        const formData = new FormData()
        formData.append('usudocu', '1014477770')
        formData.append('fotoPerfil', file)
        
        const result = await requestDB('config-account/upload-photo', 'POST', formData)
        if (result.ok) {
            refUploadPhoto.current.value = ''
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    return (
        <section className="container-configuration-account">
            <header className="header-configuration-account">
                <h1>Configuracion de Cuenta</h1>
                <p>Gestiona tu perfil, preferencias y seguridad.</p>
            </header>

            <section className="container-main-configuration">
                <nav className="options-configuration">
                    <ul>
                        <li 
                            className={`option ${selectedOption === 'perfil' ? 'selected' : ''}`}
                            onClick={() => setSelectedOption('perfil')}
                        >
                            <UserIcon/>
                            <span>Mi Perfil</span>
                        </li>
                    </ul>
                </nav>
            </section>

            <section className="container-content-selected-option">
                {selectedOption === 'perfil' && (
                    <>
                        <header className="header-my-perfil">
                            <div className="title-header">
                                <h3>Información Personal</h3>
                                <p>Actualiza tu foto y detalles personales.</p>
                            </div>
                            <ButtonCommon text="Guardar Cambios" onClick={handleClickSaveChanges} />
                        </header>

                        <div className="container-info-perfil">
                            <div className="container-photo-perfil">
                                <img 
                                    src={previewPhoto}
                                    alt="imagen de perfil" 
                                />
                                <div className="container-actions-photo">
                                    <h4>Foto de perfil</h4>
                                    <p>Sube una imagen de al menos 300x300 px.</p>
                                    <div className="buttons-actions-photo">
                                        <input 
                                            ref={refUploadPhoto} 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleUploadPhoto}
                                            style={{display: 'none'}}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => {refUploadPhoto.current.click()}}
                                        >
                                            Subir
                                        </button>
                                        <button style={{color: '#f14444'}}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="container-form-info-perfil">
                            <div className="container-input-form">
                                <label htmlFor="usunom">Nombre completo</label>
                                <input 
                                    type="text" 
                                    id="usunom" 
                                    name="usunom"
                                    value={infoUser.usunom}
                                    onChange={handleChangeInfoUser}
                                />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="usuemail">Correo electronico</label>
                                <input 
                                    type="email" 
                                    id="usuemail" 
                                    name="usuemail"
                                    value={infoUser.usuemail}
                                    onChange={handleChangeInfoUser}
                                />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="usudocu">Número de Identificación</label>
                                <input 
                                    type="text" 
                                    id="usudocu" 
                                    name="usudocu"
                                    value={infoUser.usudocu}
                                    onChange={handleChangeInfoUser}
                                />
                            </div>
                            <div className="container-input-form">
                                <label htmlFor="usucel">Número de Celular</label>
                                <input 
                                    type="text" 
                                    id="usucel" 
                                    name="usucel"
                                    value={infoUser.usucel}
                                    onChange={handleChangeInfoUser}
                                />
                            </div>
                            {/*<div className="container-input-form">
                                <label htmlFor="usufch_nacimiento">Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    id="usufch_nacimiento" 
                                    name="usufch_nacimiento"
                                    value={new Date(infoUser.usufch_nacimiento).toString("yyyy-MM-dd")}
                                    onChange={handleChangeInfoUser} 
                                />
                            </div>*/}
                            {/*<div className="container-input-form">
                                <label htmlFor="edcnom">Curso</label>
                                <input 
                                    type="text" 
                                    id="edcnom" 
                                    value={infoUser.edcnom}
                                />
                            </div>*/}
                        </section>
                    </>
                )}
            </section>
        </section>
    )
}