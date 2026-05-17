import { validateClasses, validateClassDetails, validateCreateResource, validateStudentsList, validateTaskDetails, validateAttendance, validateAttendanceStudents, validateInfoAttendanceToReport, validateCreateExam } from "../schemas/docent.js";
import { DocentModel } from "../models/docent.js"
import { sendEmail } from "../services/sendEmail.js"

import fs from 'node:fs/promises'
import path from 'node:path'

export class DocentController {
    static async getClasses(req, res) {
        try {
            const resultValidate = validateClasses(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getClasses({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            throw new Error('Error getting classes docent')
        }
    }
    
    static async getClassDetails(req, res) {
        try {
            const resultValidate = validateClassDetails(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getClassDetails({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            throw new Error('Error getting class details docent')
        }
    }

    static async createResource(req, res) {
        try {
            // req.body → campos de texto del FormData (ya procesados por multer)
            // req.files → archivos subidos (ya guardados en uploads/resources/)
            const resultValidate = validateCreateResource(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.createResource({
                data: resultValidate.data,
                files: req.files ?? []
            })
            if (!result.ok) return res.status(400).json({ message: result.message })
        
            // Esta parte hace toda la logica para enviar el email segun el tipo de recurso.
            if (result.data[0].emails_students !== null) {

                const { astnomtrabajo, astdesctrabajo, asttip, astfecfin, asgnom_course } = result.data[0].info_to_template
                let finalHTML = '';

                const emails = JSON.parse(result.data[0].emails_students)
                const templateEmail = await fs.readFile(path.join(process.cwd(), 'templates', 'docent', (asttip === 'TA' ? 'new_task_email.html' : asttip === 'MA' ? 'new_material_email.html' : 'new_announcement_email.html')), 'utf-8')

                if (asttip === 'TA') {
                    finalHTML = templateEmail
                        .replaceAll('{{asgnomCourse}}', asgnom_course)
                        .replaceAll('{{astnomtrabajo}}', astnomtrabajo)
                        .replaceAll('{{astdesctrabajo}}', astdesctrabajo)
                        .replaceAll('{{astfecfin}}', astfecfin)
                } else if (asttip === 'MA') {
                    finalHTML = templateEmail.replaceAll('{{astnomtrabajo}}', astnomtrabajo).replaceAll('{{astdesctrabajo}}', astdesctrabajo)
                } else if (asttip === 'EN') {
                    finalHTML = templateEmail
                        .replaceAll('{{asgnomCourse}}', asgnom_course)
                        .replaceAll('{{astnomtrabajo}}', astnomtrabajo)
                        .replaceAll('{{astdesctrabajo}}', astdesctrabajo)
                        .replaceAll('{{astfecfin}}', astfecfin)
                }
                
                const responseEmail = await sendEmail({
                    toEmail: emails.join('|'),
                    subject: (asttip === 'TA' ? 'Nueva tarea creada' : asttip === 'MA' ? 'Nuevo material creado' : 'Nuevo enunciado creado'),
                    html: finalHTML,
                    text: (asttip === 'TA' ? 'Nueva tarea creada' : asttip === 'MA' ? 'Nuevo material creado' : 'Nuevo enunciado creado')
                })
                if (!responseEmail.ok) throw new Error(responseEmail.message)

            }

            return res.status(200).json(result)

        } catch (err) {
            return res.status(500).json({ ok: false, message: 'Error creando el recurso' })
        }
    }

    static async getStudentsList(req, res) {
        try {
            const resultValidate = validateStudentsList(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getStudentsList({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)

        } catch (err) {
            return res.status(500).json({ ok: false, message: 'Error getting students list docent' })
        }
    }

    static async getTaskDetails(req, res) {
        try {
            const resultValidate = validateTaskDetails(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getTaskDetails({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)
        } catch (err) {
            return res.status(500).json({ ok: false, message: 'Error getting task details docent' })
        }
    }

    static async saveAttendance(req, res) {
        try {
            const resultValidate = validateAttendance(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.saveAttendance({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.status(200).json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: 'Error saving attendance docent' })
        }
    }

    static async getAttendanceStudents(req, res) {
        try {
            const resultValidate = validateAttendanceStudents(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getAttendanceStudents({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: 'Error getting attendance students docent' })
        }
    }

    static async getInfoAttendanceToReport(req, res) {
        try {
            const resultValidate = validateInfoAttendanceToReport(req.params)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.getInfoAttendanceToReport({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            return res.json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: 'Error getting info attendance to report docent' })
        }
    }

    static async createExam(req, res) {
        try {
            const resultValidate = validateCreateExam(req.body)
            if (!resultValidate.success) return res.status(400).json({ message: JSON.parse(resultValidate.error.message) })

            const result = await DocentModel.createExam({ data: resultValidate.data })
            if (!result.ok) return res.status(400).json({ message: result.message })

            // Aca debo de enviar el email a los estudiantes

            return res.json(result)
        } catch(err) {
            return res.status(500).json({ ok: false, message: 'Error creating exam docent' })
        }
    }
}
