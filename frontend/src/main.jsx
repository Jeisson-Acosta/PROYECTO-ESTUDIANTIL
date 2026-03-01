import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ResponseDBProvider } from './context/reponseDB.jsx'
import { UserLoginProvider } from './context/userLogin.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <ResponseDBProvider>
      <UserLoginProvider>
        <App />
      </UserLoginProvider>
    </ResponseDBProvider>
  </Router>
)
