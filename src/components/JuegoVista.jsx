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

  // comprobar si la pieza actual no sobrepasa el panel 
  const canSetPieza = (col, lengthPieza) => {
    return col + lengthPieza <= 10
  }
  
  const insertarNuevaPieza = () => {    
    let colRandom = Math.floor(Math.random() * 10) + 1

    if (!canSetPieza(colRandom, piezaActual.matriz[0].length)) {
        colRandom = 11 - piezaActual.matriz[0].length 
    }
    
    setPiezaActual(nuevaPieza(0, colRandom))
  }

 

  const pintarPieza = () => {
    // se copia todo el array, copia completa 
    const copiaCasillas = arrayCasillas.matriz.map(fila => [...fila]); 
    // const copiaCasillas = [...arrayCasillas.matriz]; 
  
    piezaActual.matriz.forEach((fila, rowIndex) => {
      fila.forEach((col, colIndex) => {
        if (col !== 0) {
          copiaCasillas[piezaActual.fila + rowIndex][piezaActual.columna + colIndex] = col;
        }
      });
    });
  
    setArrayCasillas({matriz: copiaCasillas });
  };
  

  const borrarPieza = (filaPieza, colPieza) => {
    const copiaCasillas = arrayCasillas.matriz.map(fila => [...fila]); 
    // const copiaCasillas = [...arrayCasillas.matriz]; 
    
    piezaActual.matriz.forEach((fila, rowIndex) => {
      fila.forEach((col, colIndex) => {
        if (col !== 0) {
            copiaCasillas[filaPieza + rowIndex][colPieza + colIndex] = 0;
        }
      });
    });
  
    setArrayCasillas({matriz: copiaCasillas });
  };
  

  const girarPieza = () => {
    
    
    setPiezaActual(prevPieza => {
      borrarPieza(prevPieza.fila, prevPieza.columna);
      
      let nuevoAngulo = prevPieza.angulo 
      
      if (nuevoAngulo < 3) {
        nuevoAngulo += 1
      }else{
        nuevoAngulo = 0
      }

      return { 
        ...prevPieza,
        angulo: nuevoAngulo,
        matriz: prevPieza.matrices[nuevoAngulo], 
      }
    })
  }
  
  

  const bajar = () => {

    borrarPieza(piezaActual.fila, piezaActual.columna)

    setPiezaActual(prevPieza => {

      if (prevPieza.fila + prevPieza.matriz.length < 21) {
        return {...prevPieza, fila: prevPieza.fila + 1}
      }

      return prevPieza
    })
  }

  const moverIzq = () => {
    borrarPieza(piezaActual.fila, piezaActual.columna)

    setPiezaActual(prevPieza => {
      
      // borrarPieza(prevPieza.fila, prevPieza.columna)

      if (prevPieza.columna > 1 && prevPieza.fila + prevPieza.matriz.length < 21) { 
        return {...prevPieza, columna: prevPieza.columna - 1}
      }
      return prevPieza
    })
  }

  const moverDra = () => {
    borrarPieza(piezaActual.fila, piezaActual.columna)

    setPiezaActual(prevPieza => {
      // borrarPieza(prevPieza.fila, prevPieza.columna)
      if (prevPieza.columna + prevPieza.matriz[0].length <= 10 && prevPieza.fila + prevPieza.matriz.length < 21) {
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

  useEffect(() => {
    window.addEventListener('keydown', controlTeclas);

    return () => {
      window.removeEventListener('keydown', controlTeclas); 
    };

  }, [])


  useEffect(() => {
    pintarPieza()
    
    if (piezaActual.fila + piezaActual.matriz.length < 21) {
      const intervalID = setInterval(() => {
        bajar()
      }, 1000);
      
      return () => {  
        clearInterval(intervalID)
      }
    }else{
      insertarNuevaPieza()
    }

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
