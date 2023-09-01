export class Novedad {    
    
    public descripcion : string;
    public fecha : Date;
    public idNovedad? : string;
    public valorActual: string;    
    public valorAnterior: string;
    public diferencia: number;

public constructor(init? : Partial<Novedad>) {
    Object.assign(this, init);        
}
}