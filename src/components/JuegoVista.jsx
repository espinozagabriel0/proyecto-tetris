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

  //  una función de devuelve verdadero o falso si existen coincidencia de casillas solidas en el panel para las posiciones de piezaActual o, por el contrario, se puede pintar la pieza.
  const hayColisionDown = (filaPieza, colPieza, matrizPieza, arrayCasillas) => {
    const copiaCasillas = arrayCasillas.matriz;
  
    // Para cada columna de la pieza
    for (let colIndex = 0; colIndex < matrizPieza[0].length; colIndex++) {
      // Encontrar el elemento sólido más bajo en esta columna de la pieza
      let ultimaFilaSolida = -1;
      for (let filaIndex = matrizPieza.length - 1; filaIndex >= 0; filaIndex--) {
        if (matrizPieza[filaIndex][colIndex] > 0) {
          ultimaFilaSolida = filaIndex;
          break;
        }
      }

      // Si encontramos un sólido en esta columna
      if (ultimaFilaSolida !== -1) {
        const filaAVerificar = filaPieza + 1 + ultimaFilaSolida;
        const colAVerificar = colPieza + colIndex;

        // Verificar si hay colisión en la posición exacta bajo el sólido
        if (filaAVerificar >= 0 && filaAVerificar < 21 && colAVerificar >= 0 && colAVerificar < 11 && copiaCasillas[filaAVerificar][colAVerificar] > 0) {
          return true;
        }

        // Verificar límites del tablero
        if (filaAVerificar >= 21) {
          return true;
        }
      }
    }
  
    return false;
  };

const hayColisionHorizontal = (filaPieza, colPieza, matrizPieza, arrayCasillas, direction) => {
    const copiaCasillas = arrayCasillas.matriz;
    let colIncremento = 0;
  
    switch (direction) {
      case 'left':
        colIncremento = -1;
        break;
      case 'right':
        colIncremento = 1;
        break;
      default:
        return false; 
    }
  
    // Para cada fila de la pieza
    for (let filaIndex = 0; filaIndex < matrizPieza.length; filaIndex++) {

      let ladoSolido = -1;

      if (direction === 'left') {
        // Encontrar el elemento sólido más a la izquierda en esta fila de la pieza
        for (let colIndex = 0; colIndex < matrizPieza[filaIndex].length; colIndex++) {
          if (matrizPieza[filaIndex][colIndex] > 0) {
            ladoSolido = colIndex;
            break;
          }
        }
      } else {
        // Encontrar el elemento sólido más a la derecha en esta fila de la pieza
        for (let colIndex = matrizPieza[filaIndex].length - 1; colIndex >= 0; colIndex--) {
          if (matrizPieza[filaIndex][colIndex] > 0) {
            ladoSolido = colIndex;
            break;
          }
        }
      }

      // Si encontramos un sólido en esta fila
      if (ladoSolido !== -1) {
        const filaAVerificar = filaPieza + filaIndex;
        const colAVerificar = colPieza + ladoSolido + colIncremento;

        // Verificar si hay colisión en la posición exacta al lado del sólido
        if (filaAVerificar >= 0 && filaAVerificar < 21 && colAVerificar >= 0 && colAVerificar < 11 && copiaCasillas[filaAVerificar][colAVerificar] > 0) {
          return true;
        }

        // Verificar límites del tablero
        if (colAVerificar < 0 || colAVerificar >= 11) {
          return true;
        }
      }
    }
  
    return false;
  };

  
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

  const moverIzq = () => {
  setPiezaActual(prevPieza => {
    if (!hayColisionHorizontal(prevPieza.fila, prevPieza.columna, prevPieza.matriz, arrayCasillas, 'left') && 
        prevPieza.columna > 1 && prevPieza.fila + prevPieza.matriz.length < 21) {
      borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz);
      setPuntos((pts) => pts + 10);
      return {...prevPieza, columna: prevPieza.columna - 1};
    }
    return prevPieza;
  });
};

const moverDra = () => {
  setPiezaActual(prevPieza => {
    if (!hayColisionHorizontal(prevPieza.fila, prevPieza.columna, prevPieza.matriz, arrayCasillas, 'right') && prevPieza.columna + prevPieza.matriz[0].length <= 10 && prevPieza.fila + prevPieza.matriz.length < 21) {
      borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz);
      setPuntos((pts) => pts + 10);
      return {...prevPieza, columna: prevPieza.columna + 1};
    }
    return prevPieza;
  });
};

const bajar = () => {
  setPiezaActual(prevPieza => {
    if (!hayColisionDown(prevPieza.fila, prevPieza.columna, prevPieza.matriz, arrayCasillas) &&
        prevPieza.fila + prevPieza.matriz.length < 21) {
      borrarPieza(prevPieza.fila, prevPieza.columna, prevPieza.matriz);
      setPuntos((pts) => pts + 10);
      return {...prevPieza, fila: prevPieza.fila + 1};
    }
    insertarNuevaPieza()
    return prevPieza;
  });
};


// funcion que borra toda la fila de arrayCasillas, pasada por parametro
const borrarFila = (fila) => {
  const copiaCasillas = arrayCasillas.matriz

  // Eliminar la fila completa
  copiaCasillas.splice(fila, 1)

  // Añadir una nueva fila vacía en la parte superior
  copiaCasillas.unshift([1,0,0,0,0,0,0,0,0,0,0,1])

  // Actualizar el estado de arrayCasillas
  setArrayCasillas({...arrayCasillas, matriz: copiaCasillas})
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


  // funcion que me retorna la fila, con valores > 0
  const hayFilaCompleta = () => {
    const copiaCasillas = arrayCasillas.matriz
    
    for (let i = 0; i < copiaCasillas.length; i++) {
      if (copiaCasillas[i].every(celda => celda !== 0)) {
        return i // Retorna el índice de la fila completa
      }
    }
    
    return -1 // Retorna -1 si no hay fila completa
  }
  
 
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

    // Comprobar si hay fila completa y borrarla
    const filaCompleta = hayFilaCompleta()
    if (filaCompleta !== -1) {
      // console.log(filaCompleta)
      borrarFila(filaCompleta)
      // Aquí podrías añadir lógica adicional, como incrementar la puntuación
      setPuntos((pts) => pts + 100) // Por ejemplo, 100 puntos por fila completa
    }
    
    if (piezaActual.fila + piezaActual.matriz.length < 21) {
      const intervalID = setInterval(() => {
        bajar()
      }, 1000)
      
      return () => {
        clearInterval(intervalID)
      }
    } else {
      setPuntos((pts) => pts + 50)
      insertarNuevaPieza()
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