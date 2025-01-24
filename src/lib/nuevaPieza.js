import { modelos } from "./modelos"
import { modeloPieza } from "./modeloPiezaClass"

export const nuevaPieza = (fila, col) => {
    const randomNum = Math.floor(Math.random() * 5)
    
    // retornamos instancia clase modeloPieza
    return new modeloPieza(randomNum, modelos.piezas[randomNum].nombre, fila, col, modelos.piezas[randomNum].matriz[0])
}