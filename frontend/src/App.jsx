
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Layout } from './components/common/Layout.jsx'
import { RoleBasedRoute } from './routes/RoleBasedRoute.jsx'
import { RoleBasedRedirect } from './components/RoleBasedRedirect.jsx'
import { StudentDashboard } from './pages/student/StudentDashboard.jsx'
import { Classes } from './pages/student/Classes.jsx'

function Unauthorized() {
  return (
    <h1>No esta permitido acceder a esta ruta.</h1>
  )
}




function App() {

  return (
    <>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<Layout />}>
          {/* RUTAS DE ESTUDIANTE */}
          <Route 
            path='/student/*'
            element={
              <RoleBasedRoute allowedRoles={['EST']}>
                <Routes>
                  <Route path='dashboard' element={<StudentDashboard />} />
                
                  <Route path='cursos' element={<Classes />} />
                </Routes>
              </RoleBasedRoute>
            }
          />
        </Route>

        {/* REDIRECCIÓN SEGÚN EL ROL */}
        <Route path='/' element={<RoleBasedRedirect />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App