import { useState } from "react"

export function useFilterAsignatures({ dataAsignatures }) {
    const [filters, setFilter] = useState({
        asgestado_option: 'T',
        search: ''
    })
    const [dataAsignatureFiltered, setDataAsignatureFiltered] = useState(null)

    
    const handleChangeFilterOption = e => {
        const {name, value} = e.target
        setFilter(prev => ({
            ...prev,
            [name]: value
        }))
        const newDataFiltered = dataAsignatures.info_table.filter(item => {
            if(name === 'asgestado_option') {
                return value === 'T' ? item : item.asgestado === value
            }
            if(name === 'search') {
                return item.asgnom.toLowerCase().includes(value.toLowerCase()) || item.asgcod_clase.toLowerCase().includes(value.toLowerCase()) || item.usrnom.toLowerCase().includes(value.toLowerCase())
            }
            return true
        })
        setDataAsignatureFiltered(newDataFiltered)
    }

    return {
        filters,
        handleChangeFilterOption,
        dataAsignatureFiltered
    }
}