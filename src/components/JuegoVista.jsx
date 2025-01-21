import { useState } from "react"
import { modelos } from "../lib/modelos"
import Panel from "./Panel"
import Pieza from "./Pieza"
import { nuevaPieza } from "../lib/nuevaPieza"

export default function JuegoVista() {

  //estado de los modelos 
  const [arrayCasillas, setArrayCasillas] = useState(modelos)
  

  const piezaInicial = nuevaPieza(0, Math.floor(Math.random() * 10) + 1)

  //estado inicial con pieza en fila = 0 y col numero entre 0 y 10
  const [piezaActual, setPiezaActual] = useState(piezaInicial)


  const limitePieza = (col, lengthPieza) => {
    return col - lengthPieza > 1 ? true: false
  }

  const insertarNuevaPieza = () => {    
    // console.log('pieza incial rango', piezaInicial.columna)
    // console.log(piezaInicial.)



    // creamos una instancia de pieza y luego la pintamos, falta correcion errores colisiones
    pintarPieza()
    // console.log(piezaActual.matriz[0].length)

    // TODO: 
    setPiezaActual(nuevaPieza(0, limitePieza((Math.floor(Math.random() * 10) + 1), piezaActual.matriz[0].length) ? '' :(Math.floor(Math.random() * 10) + 1)) )
    
  }


  const pintarPieza = () => {
    //  capaz de insertar en el panel (es decir, en la fila 0 y la columna aleatoria) la matriz de la nueva pieza instanciada guardada en el estado piezaActual.
    
    const copiaCasillas = [...arrayCasillas.matriz]

    piezaActual.matriz.map((fila, rowIndex) => {
        fila.map((col, colIndex) => {
            if (col !== 0) {
                copiaCasillas[piezaActual.fila + rowIndex][piezaActual.columna + colIndex] = col
            }
        }) 
    })

    setArrayCasillas({...arrayCasillas, copiaCasillas})
      
  }
  


  return (
    <section className="vista-juego p-2">
        
        <div className="d-flex gap-3 text-white mx-auto p-2" style={{maxWidth: "68rem", fontSize: "1.5rem"}}>
            <section className="d-flex flex-column gap-2">
                <div className="rounded p-4 text-center border">Guardado</div>
                <div className="rounded p-4 border d-flex flex-column align-items-center justify-content-center">
                    <p>Tiempo</p>
                    <span>0</span>
                </div>
                <div className="rounded p-4 d-flex flex-column gap-2 border">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <p>Nivel</p>
                        <span>1</span>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <p>Puntuación</p>
                        <span>0</span>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <p>Lineas</p>
                        <span>0</span>
                    </div>
                </div>
            </section>

            <div id="juego-container" className=" rounded bg-dark bg-opacity-50">
                <Panel modelos={arrayCasillas.matriz}/>
                {/* le paso como prop la pieza L para probar */}

                <div className="d-flex flex-column gap-5">
                    {/* <Pieza matriz={pieza1.matriz}/> */}
                    {/* <Pieza matriz={pieza2.matriz}/> */}
                    {/* <Pieza matriz={pieza3.matriz}/> */}
                    {/* <Pieza matriz={pieza4.matriz}/> */}
                </div>
                
            </div>
            
            <section className="d-flex flex-column gap-2 p-5">
                <div className="border rounded p-4">
                    <p>Siguiente</p>
                    {/*  */}
                </div>
                <div className="border rounded p-2 d-flex flex-column gap-2">
                    <button className="btn btn-success">JUGAR</button>
                    <button className="btn btn-info">PAUSA</button>
                    <button className="mt-3 btn btn-warning" onClick={() => insertarNuevaPieza()}>Insertar pieza</button>
                </div>
            </section>
        </div>
    </section>
  )
}
