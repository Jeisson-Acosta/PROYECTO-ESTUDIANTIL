
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ==================== PAGES ====================
import { ClassesDocent } from './pages/docent/ClassesDocent.jsx'
import { ClassDetailsDocent } from './pages/docent/ClassDetailsDocent.jsx'
import { CreateTask } from './pages/docent/CreateTask.jsx'
import { CreateMaterial } from './pages/docent/CreateMaterial.jsx'
import { CreateAnnouncement } from './pages/docent/CreateAnnouncement.jsx'
import { Classes } from './pages/student/Classes.jsx'
import { ClassDetails } from './pages/student/ClassDetails.jsx'
import { NotesStudent } from './pages/student/NotesStudent.jsx'
import { StudentsList } from './pages/docent/StudentsList.jsx'
import { ViewDetailsTask } from './pages/docent/ViewDetailsTask.jsx'
import { StudentCalendar } from "./pages/student/StudentCalendar.jsx";
import { StudentShedule } from "./pages/student/StudentShedule.jsx";
import { RectorDashboard } from './pages/rector/RectorDashboard.jsx'
// ================================================

// ==================== COMPONENTS ====================
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Layout } from './components/common/Layout.jsx'
import { RoleBasedRoute } from './routes/RoleBasedRoute.jsx'
import { RoleBasedRedirect } from './components/RoleBasedRedirect.jsx'
import { StudentDashboard } from './pages/student/StudentDashboard.jsx'
import { TeacherDashboard } from './pages/docent/TeacherDashboard.jsx'
import { ContenidoClase } from './pages/student/ContenidoClase.jsx'
import { ConfigurationAccount } from './components/common/ConfigurationAccount.jsx'
import { Attendance } from './pages/docent/Attendance.jsx'
import { ForgotPassword } from './pages/auth/ForgotPassword.jsx'
import { ResetPassword } from './pages/auth/ResetPassword.jsx'
import { Unauthorized } from './components/common/Unauthorized.jsx'

function App() {

  return (
    <>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/unauthorized' element={<Unauthorized />} />        
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route element={<Layout />}>
          <Route path='/configuracion' element={<ConfigurationAccount />} />

          {/* RUTAS DE ESTUDIANTE */}
          <Route 
            path='/student/*'
            element={
              <RoleBasedRoute allowedRoles={['EST']}>
                <Routes>
                  <Route path='dashboard' element={<StudentDashboard />} />
                  <Route path='cursos' element={<Classes />} />
                  <Route path='cursos/:asgcod' element={<ClassDetails />} />
                  <Route path='cursos/:asgcod/view-details-task/:astid' element={<ContenidoClase />} />
                  <Route path='notas' element={<NotesStudent />} />
                  <Route path='calendario' element={<StudentCalendar />} />
                  <Route path="calendario/horario-completo" element={<StudentShedule />} />
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
                  <Route path='cursos/:asgcod/attendance' element={<Attendance />} />
                  <Route path='cursos/:asgcod/students' element={<StudentsList />} />
                  <Route path='cursos/:asgcod/view-details-task/:astid' element={<ViewDetailsTask />} />
                  <Route path='contenido' element={<ContenidoClase />} />
                </Routes>
              </RoleBasedRoute>
            }
          />
          {/* RUTAS DE RECTOR */}
          <Route
            path='/rector/*'
            element={
              <RoleBasedRoute allowedRoles={['REC']}>
                <Routes>
                  <Route path='dashboard' element={<RectorDashboard />} />
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