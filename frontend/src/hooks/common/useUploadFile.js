import { useState, useRef } from "react"
export function useUploadFile() {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [counterFiles, setCounterFiles] = useState(0)
    const inputFileRef = useRef(null)

    const handleChangeUploadFile = (e) => { 
        // setUploadedFiles(e.target.files)
        setUploadedFiles(prev => [...prev, ...e.target.files])
        setCounterFiles(e.target.files.length)
    }

    return {
        uploadedFiles,
        setUploadedFiles,
        counterFiles,
        setCounterFiles,
        inputFileRef,
        handleChangeUploadFile
    }
}