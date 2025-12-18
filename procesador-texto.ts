const PALABROS: { palabro: string, peso: number }[] = [
    { palabro: "ababol", peso: 1 },
    { palabro: "cenutrio", peso: 5 },
    { palabro: "cabron", peso: 10 },
]

export function extraerPalabros(texto: string): string[] {
    // sacar palabros del texto    
    // eliminar puntuación
    // separar texto en array
    // crear nuevo array
}

export function calcularPesoPalabros(palabros: string[]): number {
    // comprobar el peso de cada palabro y devolver la suma
    let suma = 0;
    for (const palabro of palabros) {
        const palabroEncontrado = PALABROS.find(p => p.palabro === palabro);
        if (palabroEncontrado) {
            suma += palabroEncontrado.peso;
        }
    }
    return suma;
}