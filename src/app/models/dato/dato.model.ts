export class Dato {

        public valor : string;
        public fecha : Date;
        public idDato? : string;    
        public idDispositivo: string;
        public outputPid: string;
        public porcentaje: string;
        public rpm: string;
        public kp: string;
        public kd: string;
        public ki: string;
        public setpoint: string;
        public idConfiguration: string;


    public constructor(init? : Partial<Dato>) {
        Object.assign(this, init);        
    }
}