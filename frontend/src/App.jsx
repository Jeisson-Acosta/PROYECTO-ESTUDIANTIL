import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'
import {Register}  from './components/auth/Register.jsx'
import { Layout } from './components/common/layout.jsx'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path ='/register' element={<Register/>} />
          <Route element={<Layout />}>
            <Route path='/dashboard' />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App