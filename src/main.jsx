import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/sora/800.css'
import '@fontsource/sora/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/700.css'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
