import { createContext, useState } from "react"
import { modelos } from "../lib/modelos"

const PartidaContext = createContext()

const PartidaProvider = ({children}) =>  {
    const [arrayCasillas, setArrayCasillas] = useState(modelos)

    const [data, setData] = useState([
        {id: 1, avatar: "🦊", nick: "FoxPlayer", puntos: 1500, fecha: "2024-11-30"},
        {id: 2, avatar: "🐼", nick: "Gabriel", puntos: 2200, fecha: "2024-12-01"},
        {id: 3, avatar: "🦁", nick: "LionKing", puntos: 1800, fecha: "2024-12-02"},
        {id: 4, avatar: "🐯", nick: "TigerStripe", puntos: 2000, fecha: "2024-12-02"},
        {id: 5, avatar: "🐸", nick: "FrogJumper", puntos: 1700, fecha: "2024-12-03"},
        {id: 6, avatar: "prueba1", nick: "ampersand", puntos: 9000, fecha: "2021-12-03"},
        {id: 7, avatar: "prueba2", nick: "bala", puntos: 4500, fecha: "2024-12-10"}
        ]
    )

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

        return `${date.getDate()} de ${meses[date.getMonth()]} ${date.getFullYear()}`
    }

    const reiniciarJuego = () => {
      const matrizLimpia =  [
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1]
      ]
      // Reset game state
      setArrayCasillas({matriz: matrizLimpia})
    }
    
    

    return (
        <PartidaContext.Provider value={{data, setData, formatFecha, arrayCasillas, setArrayCasillas, reiniciarJuego}}>
            {children}
        </PartidaContext.Provider>
    )
}


export {PartidaContext, PartidaProvider}