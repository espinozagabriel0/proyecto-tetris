import { useState } from "react"

export default function TablaPartidas() {

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

    //funcion que formatea la fecha para mostrarlo como en el prototipo
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

        return `${date.getDate()} de ${meses[date.getMonth()]} ${date.getFullYear()}`
    }

    // ordenacion por columnas

    //estados del orden actual de las columnas
    const [nickAlpha, setNickAlpha] = useState(true)
    const [puntosAsc, setPuntosAsc] = useState(true)
    const [fechaAsc, setFechaAsc] = useState(true)

    const ordenarPorNick = () => {
        //crea nuevo array ordenado por nick
        const dataOrdenada = [...data].sort((a, b) => {
            if (nickAlpha) {
                return a.nick.toLowerCase() < b.nick.toLowerCase() ? -1 : 1
            }else{
                return a.nick.toLowerCase() < b.nick.toLowerCase() ? 1 : -1
            }
        })
        setData(dataOrdenada)
        setNickAlpha(!nickAlpha)
    }
    const ordenarPorPuntos = () => {
        //crea nuevo array ordenado por nick
        const dataOrdenada = [...data].sort((a, b) => {
            return puntosAsc ? a.puntos - b.puntos : b.puntos - a.puntos
        })
        setData(dataOrdenada)
        setPuntosAsc(!puntosAsc)
    }
    const ordenarPorFecha = () => {
        //crea nuevo array ordenado por nick
        const dataOrdenada = [...data].sort((a, b) => {
            return fechaAsc ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha)
        })
        setData(dataOrdenada)
        setFechaAsc(!fechaAsc)
    }


    return (
        <div id="partidas" className="p-5 bg-dark container w-100 my-4">
            <h2 className="text-center text-light">Partidas</h2>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscador" aria-label="Buscador" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <td>Avatar</td>
                        <td onClick={ordenarPorNick}>
                            <span className="d-flex gap-2 align-items-center">
                                <span>Nick</span>
                                {   
                                    nickAlpha ? (
                                        <i className="fa-solid fa-arrow-down"></i>
                                    ) :(
                                        <i className="fa-solid fa-arrow-up"></i>
                                    )
                                }
                            </span>
                        </td>
                        <td onClick={ordenarPorPuntos}>
                            <span className="d-flex gap-2 align-items-center">
                                <span>Puntuación</span>
                                {   
                                    puntosAsc ? (
                                        <i className="fa-solid fa-arrow-down"></i>
                                    ) :(
                                        <i className="fa-solid fa-arrow-up"></i>
                                    )
                                }
                            </span>
                        </td>
                        <td onClick={ordenarPorFecha}>
                            <span className="d-flex gap-2 align-items-center">
                                <span>Fecha</span>
                                {   
                                    fechaAsc ? (
                                        <i className="fa-solid fa-arrow-down"></i>
                                    ) :(
                                        <i className="fa-solid fa-arrow-up"></i>
                                    )
                                }
                            </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((partida)=> 
                            <tr key={partida.id}>
                                <td>{partida.avatar}</td>
                                <td>{partida.nick}</td>
                                <td>{partida.puntos}</td>
                                <td>{formatFecha(partida.fecha)}</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

