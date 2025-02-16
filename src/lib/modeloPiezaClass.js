export class modeloPieza {
    angulo = 0
    fila = 0
    columna = 1
    
    constructor(numero, nombre, fila, columna, matriz) {
        this.numero = numero; 
        this.nombre = nombre; 
        // this.angulo = angulo; // valor entre [0, 3], representando angulos [0, 90, 180, 270]
        this.fila = fila
        this.columna = columna
        this.matrices = matriz
        this.matriz = matriz[this.angulo]; // puntero que apunta al array correspondiente, dependiendo del numero y angulo de la pieza
    }

    girar(){
        if (this.angulo < 3) {
            this.angulo += 1
        }else{
            this.angulo = 0
        }
        this.matriz = this.matrices[this.angulo]
    }
}