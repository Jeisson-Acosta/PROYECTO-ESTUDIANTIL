import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRequestDB } from '../../hooks/utils/useRequestDB.js'
import { UserLoginContext } from '../../context/userLogin.jsx'
import {ContenidoCard} from '../../components/student/TareaContenidoCard.jsx'
import toast from 'react-hot-toast'

 export  function ContenidoClase() {
    const [infoResource, setInfoResource] = useState(null)
    const { userLogin } = useContext(UserLoginContext)
    const { requestDB } = useRequestDB()
    const { astid } = useParams()

    useEffect(() => {
        const getInfoResource  = async() => {
            const responseDB = await requestDB(`student/info-resource/${userLogin.userInfo.usuid}/${userLogin.educativeCenterInfo[0].cedid}/${userLogin.currentCycleInfo.cecid}/${astid}`)
            console.log('Resource info:', responseDB)
            if (!responseDB.ok) return toast.error(responseDB.message)
            setInfoResource(responseDB.data[0].result_resource)
        }
        getInfoResource()
    }, [])

    if (!infoResource) return null

    return (
        <div>
            <ContenidoCard info_resource={infoResource} />
        </div>
    )
}