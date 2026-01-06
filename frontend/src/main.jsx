import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CampaignProvider } from './context/CampaignContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CampaignProvider>
      <App />
    </CampaignProvider>
  </React.StrictMode>,
)
