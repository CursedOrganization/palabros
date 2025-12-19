import mammoth from "mammoth";

export interface IRepositorioPalabras {
    damePalabras(archivo: File): Promise<{ palabra: string }[]>;
}

export class RepositorioPalabrasService implements IRepositorioPalabras {
    private static instance: RepositorioPalabrasService;

    static getInstance(): RepositorioPalabrasService {
        if (!RepositorioPalabrasService.instance) {
            RepositorioPalabrasService.instance = new RepositorioPalabrasService();
        }
        return RepositorioPalabrasService.instance;
    }

    async damePalabras(archivo: File): Promise<{ palabra: string }[]> {
        const buffer = await archivo.arrayBuffer();
        const textoExtraido = await mammoth.extractRawText({
            arrayBuffer: buffer
        });
        const textoNormalizado = textoExtraido.value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();

        return textoNormalizado
            .split(/\s+/) // ' '
            .filter(p => p.length > 0)
            .map(palabra => ({ palabra: palabra }))
            .filter(p => p.palabra.length > 0);
    }
}