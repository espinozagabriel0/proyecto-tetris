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
  