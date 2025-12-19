import { Palabros } from "../procesador-texto";

const palabros = new Palabros();
const textoLimpio = "¿Has visto la nueva panadería al final de la calle?";

describe('Pruebas de extraerPalabros()', () => {

    const textoSimple = "Menudo cabron el de ayer";
    const textoMayusculas = "Cenutrio";
    const textoAcentuado = "cabrón";
    const textoPuntuacion = '¡ababol!';
    test('los textos sin palabrotas deberían dar 0', () => {
        expect(palabros.extraerPalabros(textoLimpio).length).toBe(0);
    });
    test('las palabrotas simples deberían ser detectadas', () => {
        expect(palabros.extraerPalabros(textoSimple).length).toBe(1);
    }),
    test('la función debería poder manejar mayúsculas', () => {
        expect(palabros.extraerPalabros(textoMayusculas).length).toBe(1);
    });
    test('la función debería poder manejar acentos', () => {
        expect(palabros.extraerPalabros(textoAcentuado).length).toBe(1);
    })
    test('la función debería poder manejar puntuación', () => {
        expect(palabros.extraerPalabros(textoPuntuacion).length).toBe(1);
    });
});

describe('Pruebas de calcularPesoPalabros()', () => {
    const palabrosList: string[] = [];
    test('los textos sin palabrotas deberían dar 0', () => {
        palabrosList.push('majo');
        expect(palabros.calcularPesoPalabros(palabrosList)).toBe(0);
    });
    test('debería dar 1', () => {
        palabrosList.push('ababol');
        expect(palabros.calcularPesoPalabros(palabrosList)).toBe(1);
    });
    test('debería dar 6', () => {
        palabrosList.push('cenutrio');
        expect(palabros.calcularPesoPalabros(palabrosList)).toBe(6);
    });
    test('debería dar 16', () => {
        palabrosList.push('cabron');
        expect(palabros.calcularPesoPalabros(palabrosList)).toBe(16);
    });
});