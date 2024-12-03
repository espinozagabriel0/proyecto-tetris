
export default function TablaPartidas() {
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
                    
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Nick <i className="bi bi-arrow-up-square"></i></td>
                        <td>Puntuación <i className="bi bi-arrow-up-square"></i></td>
                        <td>Fecha <i className="bi bi-arrow-up-square"></i></td>
                    </tr>
                
                </tbody><tbody>
                    <tr>
                        <td><img src="" alt="avatar"/></td>
                        <td>ANDER</td>
                        <td>10</td>
                        <td>13 ABRIL 2023</td>
                    </tr>
                    <tr>
                        <td><img src="" alt="avatar"/></td>
                        <td>ANDER</td>
                        <td>600</td>
                        <td>13 FEBRERO 2023</td>
                    </tr>
                    <tr>
                        <td><img src="" alt="avatar"/></td>
                        <td>ANDER</td>
                        <td>888</td>
                        <td>1 ENERO 2023</td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

