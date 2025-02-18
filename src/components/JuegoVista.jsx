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
  
  const [nivel, setNivel] = useState(0)
  const [puntos, setPuntos] = useState(0)
  const [lineas, setLineas] = useState(0)

  const [gameOver, setGameover] = useState(false)
  const [piezasSiguientes, setPiezasSiguientes] = useState([])

  const [velocidad, setVelocidad] = useState(1000)


  const {data, setData} = useContext(PartidaContext)

  // Función para comprobar si una pieza puede colocarse en una columna
  const canSetPieza = (col, lengthPieza) => {
    return col + lengthPieza <= 10
  }

  // Función para crear y colocar una nueva pieza en el tablero
  const insertarNuevaPieza = () => {    
    let nuevaActual;
    let nuevasSiguientes = piezasSiguientes
    

    // bloque para obtener pieza ACTUAL. Si hay uno o mas piezas siguientes, OBTENER LA PRIMERA, SINO, Generar una.
    if (nuevasSiguientes.length > 0) {
      nuevaActual = nuevasSiguientes.shift(); // quitar y obtener primera pieza del array piezas siguientes
    } else {
      // si esta vacio, generar pieza nueva ACTUAL
      let colRandom = Math.floor(Math.random() * 10) + 1
      if (!canSetPieza(colRandom, piezaActual.matriz[0].length)) {
        colRandom = 11 - piezaActual.matriz[0].length 
      }
      nuevaActual = nuevaPieza(0, colRandom);
    }
    

    // Bloque para llenar array piezasSiguientes. 
    // Llena array para que hayan siempre 3 piezas siguientes
    while (nuevasSiguientes.length < 3) {
      let colRandom = Math.floor(Math.random() * 10) + 1
      nuevasSiguientes.push(nuevaPieza(0, colRandom))
    }
    
    // comprobar colision antes de insertar, para GAME OVER y sino, insertar pieza actual y actualizar piezas siguientes
    if (hayColisionDown(nuevaActual.fila, nuevaActual.columna, nuevaActual.matriz, arrayCasillas)) {
      setGameover(true)
      console.log('GAME OVER: Colisión detectada al generar nueva pieza')
    } else {
      setPiezaActual(nuevaActual)
      setPiezasSiguientes(nuevasSiguientes)
    }
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

      // Bloque para obtener, si hay, el LADO SOLIDO mas cercano en la fila donde esta la pieza.
      //ladoSolido indicara el indice del bloque solido mas a la izquierda 
      if (direction === 'left') {
        // Encontrar el elemento sólido más a la izquierda en esta fila de la pieza
        for (let colIndex = 0; colIndex < matrizPieza[filaIndex].length; colIndex++) {
          
          // si es mayor a 0, hay solido
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
      insertarNuevaPieza()
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
    const copiaCasillas = arrayCasillas.matriz;

    for (let i = 1; i < copiaCasillas.length - 1; i++) {
        // comprobar si en cada celda de la fila el valor es mayor a 0
        if (copiaCasillas[i].slice(1, 11).every(celda => celda > 0)) { //considerando bordes
            return true; // retorna true si encuentra fila completa
        }
    }

    return false; // retorna  falso si no encuentra fila completa
};



// crear 3 primeras piezas siguientes
useEffect(() => {
  if (!partidaEmpezada && piezasSiguientes.length === 0) {

    // Generate initial 3 pieces for the queue
    const initialPiezas = [];
    for (let i = 0; i < 3; i++) {
      let colRandom = Math.floor(Math.random() * 10) + 1
      initialPiezas.push(nuevaPieza(0, colRandom));
    }
    setPiezasSiguientes(initialPiezas);
  }
}, [partidaEmpezada, piezasSiguientes]); 

 
  useEffect(() => {
    if (partidaEmpezada) {
      window.addEventListener('keydown', controlTeclas)
      return () => {
        window.removeEventListener('keydown', controlTeclas)
      }
    }
  }, [partidaEmpezada])


  useEffect(() => {
    if (partidaEmpezada && !gameOver) {
      pintarPieza()
  
      // Comprobar si hay fila completa y borrarla
      if (hayFilaCompleta()) {
        const filaCompleta = arrayCasillas.matriz.findIndex(fila => fila.every(celda => celda > 0));
        
        // si hay fila completa, se borra y se incrementa lineas. Si las lineas son de 5 en 5, incrementar nivel
        if (filaCompleta !== -1) {
          borrarFila(filaCompleta);
          
          setLineas((linea) => {
            const nuevasLineas = linea + 1;
            if (nuevasLineas % 5 === 0) {
              setNivel((nivel) => nivel + 1);
              setVelocidad((velocidad) => velocidad - 200)
            }
            return nuevasLineas;
          });

        }
      }
      
      if (piezaActual.fila + piezaActual.matriz.length < 21) {
        const intervalID = setInterval(() => {
          bajar()
        }, velocidad)
        
        return () => {
          clearInterval(intervalID)
        }
      } else {
        setPuntos((pts) => pts + 50)
        insertarNuevaPieza()
      }


      // si hay game over parar juego y mostrar mensaje
    } else if (gameOver) {
      setPartidaEmpezada(false)
      console.log("GAME OVER: No se pueden insertar mas piezas.")

    }
  }, [piezaActual, partidaEmpezada, gameOver, piezasSiguientes])
  

  return (
    <section className="vista-juego p-2">
      {/* mostrar cuando la pieza llega al suelo */}
      {!partidaEmpezada && puntos > 0 && gameOver && (
        <>
          <div className="p-2 text-white text-center bg-dark bg-opacity-50 rounded p-3 my-3">
            <h4>La partida ha terminado!</h4>
            <p>Ya no pueden aparecer mas piezas.</p>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
              GUARDAR PARTIDA
            </button>

          </div>
          <VentanaModal data={data} setData={setData} puntuacion={puntos} setArrayCasillas={setArrayCasillas}/>
        </>
      )}

      <div className="d-flex gap-5 text-white mx-auto p-2 mt-2" style={{maxWidth: "80rem", fontSize: "1.75rem", width: "100%"}}>
        <section className="d-flex flex-column justify-content-between">
          <div className="rounded p-4 text-center border bg-black bg-opacity-50">Guardado</div>
          <div className="rounded p-4 border d-flex flex-column align-items-center justify-content-center bg-black bg-opacity-50">
            <p>Tiempo</p>
            <span>0</span>
          </div>
          <div className="rounded p-4 d-flex flex-column gap-2 border bg-black bg-opacity-50">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Nivel</p>
              <span>{nivel}</span>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Puntuación</p>
              <span>{puntos}</span>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Lineas</p>
              <span>{lineas}</span>
            </div>
          </div>
        </section>

        <div id="juego-container" className="rounded ">
          <Panel modelos={arrayCasillas.matriz}/>
        </div>
        
        <section className="d-flex flex-column gap-2 bg-black bg-opacity-50 rounded">
          <div className="border rounded p-4">
            <p>Siguiente</p>
          </div>
          <div className="border rounded p-2 d-flex flex-column gap-2">
            <button className="btn btn-success" onClick={() => setPartidaEmpezada(true)}>JUGAR</button>
            <button className="btn btn-info" onClick={() => setPartidaEmpezada(false)}>PAUSA</button>
            {/* <button className="mt-3 btn btn-warning" onClick={() => insertarNuevaPieza()}>
              Insertar pieza
            </button> */}
          </div>
          {/* piezas siguientes */}
          <div className="mt-2">
            <div className="mt-5">
              {piezasSiguientes.map((pieza, index) => (
                <div className="p-4" key={index}>
                  <Pieza matriz={pieza.matriz}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}