import Inicio from './components/Inicio'
import Juego from './components/Juego'
import TablaPartidas from './components/TablaPartidas'
import VentanaModal from './components/VentanaModal'
import { useState } from "react"

function App() {

  const [data, setData] = useState([
      {id: 1, avatar: "🦊", nick: "FoxPlayer", puntos: 1500, fecha: "2024-11-30"},
      {id: 2, avatar: "🐼", nick: "Gabriel", puntos: 2200, fecha: "2024-12-01"},
      {id: 3, avatar: "🦁", nick: "LionKing", puntos: 1800, fecha: "2024-12-02"},
      {id: 4, avatar: "🐯", nick: "TigerStripe", puntos: 2000, fecha: "2024-12-02"},
      {id: 5, avatar: "🐸", nick: "FrogJumper", puntos: 1700, fecha: "2024-12-03"},
      {id: 6, avatar: "prueba1", nick: "ampersand", puntos: 9000, fecha: "2021-12-03"},
      {id: 7, avatar: "prueba2", nick: "bala", puntos: 4500, fecha: "2024-12-10"}
    ]
  )
  return (
    <div className="">
      <Inicio/>
      
      
      <TablaPartidas
        data={data}
        setData={setData}
      />

      {/* TODO: Añade botón y modal para agregar nuevas partidas */}
      {/* <button className='rounded'>Añadir Partida</button> */}
       
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Añadir Partida
      </button>
      <VentanaModal
        data={data}
        setData={setData}
      />

      <Juego/>
    </div>
  )
}

export default App
