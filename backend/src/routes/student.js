import { Router } from "express";
import { StudentController } from "../controllers/studentController.js";
import { getRecourse } from "../utils/getrecourse.js";
export const studentRouter = Router()

studentRouter.get('/classes/:usuid', StudentController.getClasses)
studentRouter.get('/class/:asgcod', StudentController.getClass)
studentRouter.get('/task/:astid', StudentController.getTask)
studentRouter.post('/delivery-task', StudentController.deliveryTask)
studentRouter.get('/calendar/:usuid/:cedid/:cecid', StudentController.getCalendar)
studentRouter.get('/notes/:cedid/:cecid/:usuid/:optionSP', StudentController.getNotes)


studentRouter.get('/schedule/:usuid/:cedid/:cecid', StudentController.getSchedule)
studentRouter.get('/resource/:nombre_recurso', (req, res) => {
    const { nombre_recurso } = req.params;

    if (!nombre_recurso) {
        return res.status(400).json({
            success: false,
            error: 'Nombre de recurso requerido'
        });
    }

    try {
        const resourceBase64 = getRecourse(nombre_recurso);

        if (resourceBase64) {
            res.json({
                success: true,
                data: resourceBase64
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Recurso no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al obtener recurso:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});
