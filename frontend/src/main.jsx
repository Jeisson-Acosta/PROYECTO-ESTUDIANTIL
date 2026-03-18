import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ResponseDBProvider } from './context/reponseDB.jsx'
import { UserLoginProvider } from './context/userLogin.jsx'
import { CurrentClassProvider } from './context/docent/currentClass.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ResponseDBProvider>
      <UserLoginProvider>
        <CurrentClassProvider>
          <App />
        </CurrentClassProvider>
      </UserLoginProvider>
    </ResponseDBProvider>
  </BrowserRouter>
)