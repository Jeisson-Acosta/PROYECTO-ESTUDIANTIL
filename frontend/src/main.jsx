import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ResponseDBProvider } from './context/reponseDB.jsx'
import { UserLoginProvider } from './context/userLogin.jsx'
<<<<<<< HEAD

createRoot(document.getElementById('root')).render(

    <ResponseDBProvider>
      <UserLoginProvider>
      <App />
      </UserLoginProvider>
    </ResponseDBProvider>
=======
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <ResponseDBProvider>
      <UserLoginProvider>
        <App />
      </UserLoginProvider>
    </ResponseDBProvider>
  </Router>
>>>>>>> 9ea35addadf2547d3428575429f8f41356db6c41
)
