import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Login } from './components/auth/Login.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App