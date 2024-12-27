import { StrictMode } from 'react'
import { ReactTogether } from 'react-together'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactTogether sessionParams={{
      appId: import.meta.env['VITE_APP_ID'],
      apiKey: import.meta.env['VITE_API_KEY'],
    }}>
      <App />
    </ReactTogether>
  </StrictMode>,
)
