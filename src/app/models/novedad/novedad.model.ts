export class Novedad {    
    
    public descripcion : string;
    public fecha : Date;
    public idNovedad? : string;
    

public constructor(init? : Partial<Novedad>) {
    Object.assign(this, init);        
}
}