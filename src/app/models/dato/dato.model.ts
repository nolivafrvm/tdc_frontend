export class Dato {

        public valor : string;
        public fecha : Date;
        public idDato? : string;

    public constructor(init? : Partial<Dato>) {
        Object.assign(this, init);        
    }
}