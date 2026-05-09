import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ResponseDBProvider } from './context/reponseDB.jsx'
import { UserLoginProvider } from './context/userLogin.jsx'
import { CurrentClassProvider } from './context/docent/currentClass.jsx'
import { ShowWelcomeModalAppProvider } from './context/common/showWelcomeModalApp.jsx'
import { TitleHeaderOptionProvider } from './context/common/titleHeaderOption.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ResponseDBProvider>
      <TitleHeaderOptionProvider>
        <UserLoginProvider>
          <CurrentClassProvider>
            <ShowWelcomeModalAppProvider>
              <App />
            </ShowWelcomeModalAppProvider>
          </CurrentClassProvider>
        </UserLoginProvider>
      </TitleHeaderOptionProvider>
    </ResponseDBProvider>
  </BrowserRouter>
)