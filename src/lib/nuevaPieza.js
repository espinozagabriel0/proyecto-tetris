import { modelos } from "./modelos"
import { modeloPieza } from "./modeloPiezaClass"

export const nuevaPieza = (fila, col) => {
    const randomNum = Math.floor(Math.random() * 5)
    
    return new modeloPieza(randomNum, modelos.piezas[randomNum].nombre, fila, col, modelos.piezas[randomNum].matriz)
}