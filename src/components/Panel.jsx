import { colorPieza } from "../lib/colorPieza"

export default function Panel({modelos}) {
    return (
      <div className="">
        {modelos.map((fila, index) => (
            // se renderiza cada fila
          <div key={index} className="row">
            {/* en cada fila se renderizan las columnas*/}
            {fila.map((celda, index) => (
              <div 
                key={index} 
                id="celdas"
                className={`col border border-dark ${colorPieza(celda)}`}
              >
                {/* {celda} */}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // Tarea 5 - Final de Partida: Detectar el final de la partida cuando ya no pueden aparecer más piezas y 
  // mostrar un mensaje informativo.

  // Tarea 6 - Piezas Siguientes: Mostrar las piezas siguientes en un panel lateral.

  // Tarea 7 - Cambio de Pieza: Permitir intercambiar la pieza actual con la pieza guardada.

  // Tarea 8 - Cambio de Nivel: Incrementar el nivel después de 5 eliminadas.
  // Control de Versiones 🗂️


  // Rama Git: historia-usuario-7-funcionalidades-avanzadas
  // Commits:
  // Tarea 4: Añade contador de líneas y puntos
  // Tarea 5: Detecta final de la partida y muestra mensaje
  // Tarea 6: Muestra piezas siguientes en panel lateral
  // Tarea 7: Implementa cambio de pieza con pieza guardada
  // Tarea 8: Incrementa nivel después de líneas eliminadas


  // comprobar en arraycasillas.matriz si en una fila todas las columnas son > 0

  