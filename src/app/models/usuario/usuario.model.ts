export class Usuario {

    constructor(
        public nombre:string,
        public apellido:string,
        public email: string,        
        public contrasena:string,
        public username?: string,
        public img?:string,                
        public rol?: string,
        public idUsuario?: number) {
    }
}