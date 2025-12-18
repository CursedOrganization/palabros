const PALABROS: { palabro: string, peso: number }[] = [
    { palabro: "ababol", peso: 1 },
    { palabro: "cenutrio", peso: 5 },
    { palabro: "cabron", peso: 10 },
]

export function extraerPalabros(texto: string): string[] {
    // crear un nuevo array con los palabros que se encuentran en el texto
    const palabrosEncontrados: string[] = [];
    // sacar palabros del texto 
    // replace(/[\u0300-\u036f]/g, '') elimina las tildes
    const palabras: string[] = texto.replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z\s]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().split(' ');
    // iterar el texto en busca de palabros
    for (const palabra of palabras) {
        const palabroEncontrado = PALABROS.find(p => p.palabro === palabra);
        if (palabroEncontrado){
            // añadir el palabro a la lista
            palabrosEncontrados.push(palabroEncontrado.palabro);
        }
    }
    return palabrosEncontrados;
}

export function calcularPesoPalabros(palabros: string[]): number {
    // comprobar el peso de cada palabro y devolver la suma
    let suma = 0;
    for (const palabro of palabros) {
        // busca el palabro en la lista
        const palabroEncontrado = PALABROS.find(p => p.palabro === palabro);
        if (palabroEncontrado) {
            // en caso de que exista, añade el valor del peso en la suma
            suma += palabroEncontrado.peso;
        }
    }
    return suma;
}