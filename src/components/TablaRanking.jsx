import { useContext } from "react"
import { PartidaContext } from "../context/PartidaContext"

export default function TablaRanking() {

  // mostrar los tres mejores jugadores de la tabla partidas
  const {data} = useContext(PartidaContext)

  // ordenar por puntos
  const dataOrdenada = [...data].sort((a, b) => b.puntos - a.puntos)
  // primeros 3 jugadores
  const rankingJugadores = dataOrdenada.slice(0, 3)

  return (
    <div id="partidas" className="p-5 bg-dark container w-100 mt-10">
        <h2 className="text-center text-light">Ranking</h2>
        <table className="table table-dark">
            <tbody>
                {rankingJugadores.map((jugador, index) => 
                    <tr key={jugador.id}>
                        <td>{index + 1}</td>
                        <td>
                            <p>{jugador.avatar || 'avatar'}</p>
                        </td>
                        <td>{jugador.nick}</td>
                        <td>{jugador.puntos}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}
