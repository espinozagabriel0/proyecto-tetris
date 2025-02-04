import { useEffect, useState } from "react"
import { modelos } from "../lib/modelos"
import Panel from "./Panel"
import Pieza from "./Pieza"
import { nuevaPieza } from "../lib/nuevaPieza"
import { modeloPieza } from "../lib/modeloPiezaClass"

export default function JuegoVista() {

  //estado de los modelos 
  const [arrayCasillas, setArrayCasillas] = useState(modelos)

  //estado inicial pieza actual
  const piezaInicial = nuevaPieza(0, Math.floor(Math.random() * 10) + 1)
  const [piezaActual, setPiezaActual] = useState(piezaInicial)


  const [direccion, setDireccion] = useState('down')

  // comprobar si la pieza actual no sobrepasa el panel 
  const canSetPieza = (col, lengthPieza) => {
    return col + lengthPieza <= 10
  }
  
  const insertarNuevaPieza = () => {    
    console.log('length pieza', piezaActual.matriz[0].length)

    let colRandom = Math.floor(Math.random() * 10) + 1

    if (!canSetPieza(colRandom, piezaActual.matriz[0].length)) {
        colRandom = 11 - piezaActual.matriz[0].length 
    }
    
    setPiezaActual(nuevaPieza(0, colRandom))
  }


  const pintarPieza = () => {
    //  capaz de insertar en el panel (es decir, en la fila 0 y la columna aleatoria) la matriz de la nueva pieza instanciada guardada en el estado piezaActual.
    const copiaCasillas = [...arrayCasillas.matriz]

    piezaActual.matriz.map((fila, rowIndex) => {
        fila.map((col, colIndex) => {  
          copiaCasillas[piezaActual.fila + rowIndex][piezaActual.columna + colIndex] = col
        }) 
    })

    setArrayCasillas({...arrayCasillas, copiaCasillas})
  }
  

  const borrarPieza = () => {
    // funcion que borra la pieza actual antes de cada movimiento
    const copiaCasillas = [...arrayCasillas.matriz]

    // se hace lo mismo que en pintar pieza pero en vez de poner el valor de la pieza, lo ponemos a 0 para borrarla
    piezaActual.matriz.map((fila, rowIndex) => {
        fila.map((col, colIndex) => {
            if (col !== 0) {
                copiaCasillas[piezaActual.fila + rowIndex][piezaActual.columna + colIndex] = 0
            }
        }) 
    })

    setArrayCasillas({...arrayCasillas, copiaCasillas})
  }


  // falta comprobar si hay colision, para impedir el giro, movimientos izq, der y abajo
  const girarPieza = () => {
    console.log('girar')

    borrarPieza()

    // girar la pieza actual, falta implementar girar() del objeto piezaActual sin que se pierda la función
    if (piezaActual.angulo < 3) {
      piezaActual.angulo += 1
    }else{
      piezaActual.angulo = 0
    }

    piezaActual.matriz = piezaActual.matrices[piezaActual.angulo]

    setPiezaActual({...piezaActual})
    // setPiezaActual(nuevaPieza)
  }

  const bajar = () => {
    // incrementa la posición vertical de la pieza actual y la vuelve a insertar en el panel
    borrarPieza()
    console.log(piezaActual.matriz)

    if (piezaActual.fila  + piezaActual.matriz.length < 21) {
      piezaActual.fila += 1
    }

    console.log(piezaActual.fila)
    setPiezaActual({...piezaActual, fila: piezaActual.fila})
  }

  const moverIzq = () => {
    borrarPieza()
    // comprobar limites horizontales pieza y si llega al suelo, no dejar mover
    if (piezaActual.columna > 1 && piezaActual.fila + piezaActual.matriz.length < 21) {
        piezaActual.columna -= 1
    }
    setPiezaActual({...piezaActual, columna: piezaActual.columna})
  }
  const moverDra = () => {
    borrarPieza()

    if (piezaActual.columna + piezaActual.matriz[0].length <= 10 && piezaActual.fila + piezaActual.matriz.length < 21) {
        piezaActual.columna += 1
    }
    console.log(piezaActual.columna)
    setPiezaActual({...piezaActual, columna: piezaActual.columna})
  }


  const controlTeclas = (event) => {
    setDireccion(event.key)
    switch (event.key) {
        case 'ArrowUp':
            girarPieza()
        break;
      case 'ArrowDown':
            bajar()
        break;
      case 'ArrowLeft':
            moverIzq()
        break;
      case 'ArrowRight':
            moverDra()
        break;
      default:
        break;
    }
  }


  // const iniciarMovimieno  = () => {
  //   setInterval(() => {
  //     bajar()

  //   }, 1000);
  // }
  

  useEffect(() => {
    window.addEventListener('keydown', controlTeclas);

    return () => {
      window.removeEventListener('keydown', controlTeclas); 
    };

  }, [direccion])


  useEffect(() => {
    pintarPieza()
    
    const intervalID = setInterval(() => {
      bajar()
    }, 1000);

    return () => {
      clearInterval(intervalID)
    }
    // iniciarMovimieno()
  }, [piezaActual])

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
            </div>
            
            <section className="d-flex flex-column gap-2 p-5">
                <div className="border rounded p-4">
                    <p>Siguiente</p>
                    {/*  */}
                </div>
                <div className="border rounded p-2 d-flex flex-column gap-2">
                    <button className="btn btn-success" onClick={() => iniciarMovimieno()}>JUGAR</button>
                    <button className="btn btn-info">PAUSA</button>
                    <button className="mt-3 btn btn-warning" onClick={() => insertarNuevaPieza()}>Insertar pieza</button>
                </div>
            </section>
        </div>
    </section>
  )
}
