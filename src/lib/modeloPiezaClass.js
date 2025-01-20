class modeloPieza {

    constructor(numero, nombre, angulo, fila, columna, matriz) {
        this.numero = numero; 
        this.nombre = nombre; 
        this.angulo = angulo; // valor entre [0, 3], representando angulos [0, 90, 180, 270]
        this.fila = fila
        this.columna = columna
        this.matriz = matriz; // puntero que apunta al array correspondiente, dependiendo del numero y angulo de la pieza
    }

    girar(){
        this.angulo = this.angulo + 1
    }
}