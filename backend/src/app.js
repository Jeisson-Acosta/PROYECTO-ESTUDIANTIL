// Este es nuestro punto de entrada principal del backend.
import express from 'express'
//Importa cors para dar permiso de permitir peticiones
import cors from 'cors'
import { authRouter } from './routes/auth.js'


const app = express()

// Operador nullish Coalleshing -> Si process.env.PORT es diferente de null y undefined, tomara su valor, si no dejara el valor que esta despues de los ??.
const PORT = process.env.PORT ?? 3000

//Permite peticiones desde este puerto
app.use(cors({
  origin: "http://localhost:5173"
}));


// Middleware para peticiones POST para poner el contenido en el body
app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`, {})
})
