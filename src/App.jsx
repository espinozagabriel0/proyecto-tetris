import TablaPartidas from './components/TablaPartidas'
import VentanaModal from './components/VentanaModal'

function App() {
  
  return (
    <div className="">
      <TablaPartidas/>
      {/* TODO: Añade botón y modal para agregar nuevas partidas */}
      {/* <button className='rounded'>Añadir Partida</button> */}
       
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Añadir Partida
    </button>
    <VentanaModal/>
    </div>
  )
}

export default App
