import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'
import {Register}  from './components/auth/Register.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
            <Route path ='/register' element = {<Register/>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App