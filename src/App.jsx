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
    // <div className="">
    //   <InicioVista/>
      
      
    //   <TablaPartidas
    //     data={data}
    //     setData={setData}
    //   />

    //   <TablaRanking/>

    //   {/* TODO: Añade botón y modal para agregar nuevas partidas */}
    //   {/* <button className='rounded'>Añadir Partida</button> */}
       
    //   <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //     Añadir Partida
    //   </button>
    //   <VentanaModal
    //     data={data}
    //     setData={setData}
    //   />

    //   <JuegoVista/>
    // </div>

    <Router>
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
