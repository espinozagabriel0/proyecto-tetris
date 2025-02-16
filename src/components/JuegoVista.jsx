import { useContext, useEffect, useState } from "react"
import { modelos } from "../lib/modelos"
import Panel from "./Panel"
import Pieza from "./Pieza"
import { nuevaPieza } from "../lib/nuevaPieza"
import { modeloPieza } from "../lib/modeloPiezaClass"
import VentanaModal from "./VentanaModal";
import { PartidaContext } from "../context/PartidaContext"

export default function JuegoVista() {
  const [arrayCasillas, setArrayCasillas] = useState(modelos)
  
  const piezaInicial = nuevaPieza(0, Math.floor(Math.random() * 10) + 1)
  const [piezaActual, setPiezaActual] = useState(piezaInicial)
  const [partidaEmpezada, setPartidaEmpezada] = useState(false) 
  const [puntos, setPuntos] = useState(0)


  const {data, setData} = useContext(PartidaContext)

  // Función para comprobar si una pieza puede colocarse en una columna
  const canSetPieza = (col, lengthPieza) => {
    return col + lengthPieza <= 10
  }

  // Función para crear y colocar una nueva pieza en el tablero
  const insertarNuevaPieza = () => {    
    let colRandom = Math.floor(Math.random() * 10) + 1

    if (!canSetPieza(colRandom, piezaActual.matriz[0].length)) {
      colRandom = 11 - piezaActual.matriz[0].length 
    }
    
    setPiezaActual(nuevaPieza(0, colRandom))
  }

  // const hayColision = () => {
    
  // }

  const pintarPieza = () => {
    const copiaCasillas = arrayCasillas.matriz
    
    piezaActual.matriz.forEach((fila, rowIndex) => {
      if (piezaActual.fila + rowIndex < 21) { 
        fila.forEach((col, colIndex) => {
          // limites panel izq, der
          if (col !== 0 && piezaActual.columna + colIndex > 0 && piezaActual.columna + colIndex < 11) { 
            // col hace referencia a la columna actual del array de piezaActual, NO  de arraycasillas.matriz
            copiaCasillas[piezaActual.fila + rowIndex][piezaActual.columna + colIndex] = col
          }
        })
      }
    })

    setArrayCasillas({ matriz: copiaCasillas })
  }

  const borrarPieza = (filaPieza, colPieza, matriz) => {
    const copiaCasillas = arrayCasillas.matriz
    
    matriz.forEach((fila, rowIndex) => {
      if (filaPieza + rowIndex < 21) { 
        fila.forEach((col, colIndex) => {
          if (col !== 0 && colPieza + colIndex > 0 && colPieza + colIndex < 11) {
            copiaCasillas[filaPieza + rowIndex][colPieza + colIndex] = 0
          }
        })
      }
    })

    setArrayCasillas({ matriz: copiaCasillas })
  }

  const girarPieza = () => {
    setPiezaActual(prevPieza => {

      if(prevPieza.columna > 1 && prevPieza.fila + prevPieza.matriz.length < 21){
        // se borra la pieza actual, para no crear estelas
        borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz)
  
        let nuevoAngulo = prevPieza.angulo;
  
        if (nuevoAngulo < 3) {
          nuevoAngulo++
        }else{
          nuevoAngulo = 0
        }
  
        setPuntos((pts) => pts + 20)
        return { 
          ...prevPieza,
          angulo: nuevoAngulo,
          matriz: prevPieza.matrices[nuevoAngulo]
        }

      }
      return prevPieza
    })
  }

  const bajar = () => {
    setPiezaActual(prevPieza => {
      
      if (prevPieza.fila + prevPieza.matriz.length < 21) {
        borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz)
        setPuntos((pts) => pts + 10)
        return {...prevPieza, fila: prevPieza.fila + 1}
      }
      return prevPieza
    })
  }

  const moverIzq = () => {
    setPiezaActual(prevPieza => {
      
      if (prevPieza.columna > 1 && prevPieza.fila + prevPieza.matriz.length < 21) {
        borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz)
        setPuntos((pts) => pts + 10)
        return {...prevPieza, columna: prevPieza.columna - 1}
      }
      return prevPieza
    })
  }


  const moverDra = () => {
    setPiezaActual(prevPieza => {
      
      if (prevPieza.columna + prevPieza.matriz[0].length <= 10 && prevPieza.fila + prevPieza.matriz.length < 21) {
        borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz)
        setPuntos((pts) => pts + 10)
        return {...prevPieza, columna: prevPieza.columna + 1}
      }
      return prevPieza
    })
  }

  const controlTeclas = (event) => {
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

  // const registrarPartida = () => {

  // }


  useEffect(() => {
    if (partidaEmpezada) {
      window.addEventListener('keydown', controlTeclas)
      return () => {
        window.removeEventListener('keydown', controlTeclas)
      }
    }
  }, [partidaEmpezada])

  useEffect(() => {
    if (partidaEmpezada) {
      pintarPieza()
      
      if (piezaActual.fila + piezaActual.matriz.length < 21 ) {
        const intervalID = setInterval(() => {
          bajar()
        }, 1000)
        
        return () => {
          clearInterval(intervalID)
        }
      } else {
        // la partida ha acabado, mostrar la opcion de guardado de partida
        setPuntos((pts) => pts + 50)
        setPartidaEmpezada(false)


        // insertarNuevaPieza()
      }
    }
  }, [piezaActual, partidaEmpezada])

  return (
    <section className="vista-juego p-2">
      {/* mostrar cuando la pieza llega al suelo */}
      {!partidaEmpezada && puntos > 0 && (
        <>
          <div className="p-2 text-white text-center">
            {/* <button type="button" className="btn btn-dark" data-bs-toggle="modal" onClick={}>GUARDAR PARTIDA</button> */}
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
              GUARDAR PARTIDA
            </button>

          </div>
          <VentanaModal data={data} setData={setData} puntuacion={puntos} />
        </>
      )}

      <div className="d-flex gap-5 text-white mx-auto p-2" style={{maxWidth: "80rem", fontSize: "1.75rem", width: "100%"}}>
        <section className="d-flex flex-column justify-content-between">
          <div className="rounded p-4 text-center border bg-black bg-opacity-50">Guardado</div>
          <div className="rounded p-4 border d-flex flex-column align-items-center justify-content-center bg-black bg-opacity-50">
            <p>Tiempo</p>
            <span>0</span>
          </div>
          <div className="rounded p-4 d-flex flex-column gap-2 border bg-black bg-opacity-50">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Nivel</p>
              <span>1</span>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Puntuación</p>
              <span>{puntos}</span>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Lineas</p>
              <span>0</span>
            </div>
          </div>
        </section>

        <div id="juego-container" className="rounded bg-dark bg-opacity-50">
          <Panel modelos={arrayCasillas.matriz}/>
        </div>
        
        <section className="d-flex flex-column gap-2 bg-black bg-opacity-50 rounded">
          <div className="border rounded p-4">
            <p>Siguiente</p>
          </div>
          <div className="border rounded p-2 d-flex flex-column gap-2">
            <button className="btn btn-success" onClick={() => setPartidaEmpezada(true)}>JUGAR</button>
            <button className="btn btn-info">PAUSA</button>
            <button className="mt-3 btn btn-warning" onClick={() => insertarNuevaPieza()}>
              Insertar pieza
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}