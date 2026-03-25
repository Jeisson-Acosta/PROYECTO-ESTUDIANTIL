
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ==================== PAGES ====================
import { ClassesDocent } from './pages/docent/ClassesDocent.jsx'
import { ClassDetailsDocent } from './pages/docent/ClassDetailsDocent.jsx'
import { CreateTask } from './pages/docent/CreateTask.jsx'
import { CreateMaterial } from './pages/docent/CreateMaterial.jsx'
import { CreateAnnouncement } from './pages/docent/CreateAnnouncement.jsx'
import { Classes } from './pages/student/Classes.jsx'
import { ClassDetails } from './pages/student/ClassDetails.jsx'
// ================================================

// ==================== COMPONENTS ====================
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Layout } from './components/common/Layout.jsx'
import { RoleBasedRoute } from './routes/RoleBasedRoute.jsx'
import { RoleBasedRedirect } from './components/RoleBasedRedirect.jsx'
import { StudentDashboard } from './pages/student/StudentDashboard.jsx'

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
                  <Route path='cursos/:asgcod' element={<ClassDetails />} />
                </Routes>
              </RoleBasedRoute>
            }
          />

          {/* RUTAS DE PROFESOR */}
          <Route 
            path='/docent/*' 
            element={
              <RoleBasedRoute allowedRoles={['DOC']}>
                <Routes>
                  <Route path='dashboard' element={<TeacherDashboard />} />
                  <Route path='cursos' element={<ClassesDocent />} />
                  <Route path='cursos/:asgcod' element={<ClassDetailsDocent />} />
                  <Route path='cursos/:asgcod/create-task' element={<CreateTask />} />
                  <Route path='cursos/:asgcod/create-material' element={<CreateMaterial />} />
                  <Route path='cursos/:asgcod/create-announcement' element={<CreateAnnouncement />} />
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