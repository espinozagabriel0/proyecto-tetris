import { useState } from "react"
import { modelos } from "../lib/modelos"
import Panel from "./Panel"
import Pieza from "./Pieza"
import { nuevaPieza } from "../lib/nuevaPieza"

export default function JuegoVista() {

  //estado de los modelos 
  const [arrayCasillas, setArrayCasillas] = useState(modelos)

  const pieza1 = nuevaPieza(2, 4)
  const pieza2 = nuevaPieza(1, 3)
  const pieza3 = nuevaPieza(3, 0)
  const pieza4 = nuevaPieza(2, 5)


//   console.log(pieza1, pieza2)

  return (
    <section className="vista">
        
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
                    <Pieza matriz={pieza1.matriz}/>
                    <Pieza matriz={pieza2.matriz}/>
                    <Pieza matriz={pieza3.matriz}/>
                    <Pieza matriz={pieza4.matriz}/>
                </div>
            </div>
            
            <section className="d-flex flex-column gap-2">
                <div className="border rounded p-4">
                    <p>Siguiente</p>
                    {/*  */}
                </div>
                <div className="border rounded p-2 d-flex flex-column gap-2">
                    <button className="btn btn-success">JUGAR</button>
                    <button className="btn btn-info">PAUSA</button>
                </div>
            </section>
        </div>
    </section>
  )
}
