
export default function InicioVista() {
  return (
    <>
      <div className="text-center mt-5">
        <img src="/img/logo.png" className="text-center"></img>
      </div>
      <section className="text-white rounded text-center vista bg-dark bg-opacity-50 p-5" style={{fontSize: "1.4rem"}}>
          Tetris és un videojoc de tipus trencaclosques. Fou inventat per l'enginyer informàtic rus Aleksei Pàjitnov l'any 1984, <br/> [1] mentre treballava a l'Acadèmia de Ciències de Moscou.
          <div className="mt-4">
              <h2>Instruccions:</h2>
              <p>
                  Pots moure les peces fent servir les fletxes d'esquerra i dreta

                  Amb la fletxa avall pots girar la peça

                  'Ñ' per canviar la peça actual per la peça que està a punt de sortir (que pots veure a la columna de la dreta)

                  Al final de la partida podràs desar la teva puntuació, i veure el ranking de jugadors
              </p>
          </div>
      </section>
    </>
  )
}
