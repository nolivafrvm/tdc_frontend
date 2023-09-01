export interface Agente {
    idAgente : number;
    nombre : string;
}

export interface Permiso {
    idPermiso: number;
    descripcion: string;    
    perAdmin: boolean;    
    perAsiniestro:boolean;
    perMsiniestro:boolean;
    perEsinisetro:boolean;
    perCsiniestro:boolean;
    //ABMC INMUEBLE
    perAinmueble: boolean;
    perMinmueble: boolean;
    perEinmueble: boolean;
    perCinmueble: boolean;
    //ABMC PuntoCritico
    perApucri: boolean;
    perMpucri: boolean;
    perEpucri: boolean;
    perCpucri: boolean;
    //ABMC Usuario
    perAusuario:boolean ;
    perMusuario:boolean ;
    perEusuario:boolean ;
    perCusuario:boolean ;
    //ABMC Reporte   
    perReporte: boolean;
} 

export class Usuario {

    constructor(
        public nombre:string,
        public apellido:string,
        public email: string,
        public contrasena:string,
        public img?:string,                
        public agente?: Agente,
        public permiso?: Permiso,        
        public rol?: string,
        public idUsuario?: number) {
    }
}