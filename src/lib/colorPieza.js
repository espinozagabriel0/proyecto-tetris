export function colorPieza(num){
    switch (num) {
        case 1: 
            return 'bg-black'
        case 2:
            return 'bg-danger';
        case 3:
            
            return 'bg-warning';
        case 4:
            
            return 'bg-info';
        case 5:
            
            return 'bg-success';
        case 6:
            
            return 'bg-secondary';
        default: 
            return 'bg-dark';
    }
}