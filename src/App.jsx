import InicioVista from './components/InicioVista'
import JuegoVista from './components/JuegoVista'
import TablaPartidas from './components/TablaPartidas'
import TablaRanking from './components/TablaRanking'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VentanaModal from './components/VentanaModal'
import { useState } from "react"
import PartidasVista from './components/PartidasVista';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" to="/">MiApp</Link> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/juego">Jugar</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/partidas">Partidas</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<InicioVista />} />
          <Route path="/juego" element={<JuegoVista />} />
          <Route path="/partidas" element={<PartidasVista />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
