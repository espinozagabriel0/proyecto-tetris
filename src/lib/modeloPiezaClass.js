export class modeloPieza {
    angulo = 0

    constructor(numero, nombre, fila, columna, matriz) {
        this.numero = numero; 
        this.nombre = nombre; 
        // this.angulo = angulo; // valor entre [0, 3], representando angulos [0, 90, 180, 270]
        this.fila = fila
        this.columna = columna
        this.matriz = matriz; // puntero que apunta al array correspondiente, dependiendo del numero y angulo de la pieza
    }

    girar(){
        if (this.angulo < 3) {
            this.angulo += 1
        }else{
            this.angulo = 0
        }
    }
}