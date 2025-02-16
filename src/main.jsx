import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as bootstrap from 'bootstrap';
import './styles/bootstrap.scss';
import './styles/custom.scss';
import {PartidaProvider } from './context/PartidaContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartidaProvider>
      <App />
    </PartidaProvider>
  </StrictMode>,
)
