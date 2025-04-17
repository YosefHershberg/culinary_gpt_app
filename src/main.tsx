import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { scan } from 'react-scan'

scan({
  enabled: false,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>  
    <App />
  </React.StrictMode>,
)
