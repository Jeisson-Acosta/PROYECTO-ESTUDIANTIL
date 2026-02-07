<<<<<<< HEAD
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Login } from './components/Login.jsx'
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from './components/auth/Login.jsx'

>>>>>>> 1a3fd9e8a347bf20b1052d236b78a9815f989dca
function App() {

  return (
    <>
<<<<<<< HEAD
   <Router>
    <Routes>
      <Route path='/' element ={<Login />}/>
    </Routes>
   </Router>
=======
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
>>>>>>> 1a3fd9e8a347bf20b1052d236b78a9815f989dca
    </>
  )
}

export default App