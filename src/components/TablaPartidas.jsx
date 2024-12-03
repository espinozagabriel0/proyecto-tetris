import { useState } from "react"

export default function TablaPartidas() {

    const [data, setData] = useState([
            {id: 1, avatar: "🦊", nick: "FoxPlayer", puntos: 1500, fecha: "2024-11-30"},
            {id: 2, avatar: "🐼", nick: "PandaMaster", puntos: 2200, fecha: "2024-12-01"},
            {id: 3, avatar: "🦁", nick: "LionKing", puntos: 1800, fecha: "2024-12-02"},
            {id: 4, avatar: "🐯", nick: "TigerStripe", puntos: 2000, fecha: "2024-12-02"},
            {id: 5, avatar: "🐸", nick: "FrogJumper", puntos: 1700, fecha: "2024-12-03"}
        ]
    )

    console.log(data)



    return (
        <div id="partidas" className="m-5 p-5 bg-dark container border-danger">
            <h2 className="text-center text-light">Partidas</h2>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscador" aria-label="Buscador" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <td>Avatar</td>
                        <td>Nick <i className="bi bi-arrow-up-square"></i></td>
                        <td>Puntuación <i className="bi bi-arrow-up-square"></i></td>
                        <td>Fecha <i className="bi bi-arrow-up-square"></i></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((partida)=> 
                            <tr key={partida.id}>
                                <td>{partida.avatar}</td>
                                <td>{partida.nick}</td>
                                <td>{partida.puntos}</td>
                                <td>{partida.fecha}</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

