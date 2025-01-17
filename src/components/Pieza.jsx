
export default function Pieza({matriz}) {
    // clonar componente panel
    return (
        <div className="">
          {matriz.map((fila, index) => (
              // se renderiza cada fila
            <div key={index} className="row">
              {/* en cada fila se renderizan las columnas*/}
              {fila.map((celda, index) => (
                <div 
                  key={index} 
                  className={`col border ${celda == 1 ? 'bg-dark': ''}`}
                >
                  {celda}
                </div>
              ))}
            </div>
          ))}
        </div>
    )

}
