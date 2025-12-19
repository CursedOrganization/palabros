import { IInusltos, Insulto, InsultoService } from "../insultos";

describe('Pruebas de InsultoService', () => {
    const insultoService = InsultoService.instance;
    test('las instancias deberían ser la misma', () => {
        const nuevoInsultoService = InsultoService.instance;
        expect(insultoService === nuevoInsultoService).toBe(true);
    });
    test('la longitud de bería ser 220', () => {
        expect(insultoService.dameInsultos().length).toBe(221);
    });
});