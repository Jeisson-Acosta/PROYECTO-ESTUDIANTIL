import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ResponseDBProvider } from './context/reponseDB.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResponseDBProvider>
      <App />
    </ResponseDBProvider>
  </StrictMode>,
)
