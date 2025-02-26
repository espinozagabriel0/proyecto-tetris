import { useContext, useEffect, useState } from "react"
import {useNavigate } from "react-router-dom"
import { modelos } from "../lib/modelos"
import { PartidaContext } from "../context/PartidaContext"

export default function VentanaModal({data, setData, puntuacion, setArrayCasillas}) {

    const [avatar, setAvatar] = useState('')
    const [nick, setNick] = useState('')
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])

    const {reiniciarJuego} = useContext(PartidaContext)

    const navigate = useNavigate()

    const añadirPartida = (e) => {
        e.preventDefault()
        
        if (avatar && fecha && nick) {
            //añadir la partida al array con setData
            const nuevaPartida = {
                id: data.length +1, 
                avatar: avatar, 
                nick: nick, 
                puntos: puntuacion, 
                fecha: fecha
            }
            // setear state arraycasillas a inicial
            reiniciarJuego()
            
            setData([...data, nuevaPartida])
            limpiarInputs()

            // redirigir a vista partidas
            navigate('/partidas')
        }
    }

    const limpiarInputs = () => {
        setAvatar("")
        setNick("")
        setFecha("")
    }

    return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Añadir Partida</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="col-form-label">Avatar:</label>
                            <input type="text" className="form-control" id="avatar" onChange={(e) => setAvatar(e.target.value)} value={avatar} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nick" className="col-form-label">Nick:</label>
                            <input type="text" className="form-control" id="nick" onChange={(e) => setNick(e.target.value)} value={nick} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="puntos" className="col-form-label">Puntuación:</label>
                            {/* <input type="number" className="form-control" id="puntos" onChange={(e) => setPuntuacion(e.target.value)} value={puntuacion}/> */}
                            <input type="number" className="form-control" id="puntos" value={puntuacion}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha" className="col-form-label">Fecha:</label>
                            {/* <input type="date" className="form-control" id="fecha" onChange={(e) => setFecha(e.target.value)} value={fecha} required/> */}
                            <input type="date" className="form-control" id="fecha" value={fecha}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={añadirPartida} data-bs-dismiss="modal">Save changes</button>
                </div>
            </div>
        </div>
    </div>
  )
}
