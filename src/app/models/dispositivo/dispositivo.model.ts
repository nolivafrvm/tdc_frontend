export class Dispositivo {
  public idDevice?: number;
  public name: string;
  public description: Date;
  public ipaddress: string;
  public port: string;
  public kp: number;
  public ki: number;
  public kd: number;
  public setpoint:number;
  public ipaddressserver: string;
  public portserver: number;
  public recordPeriod: number;
  public gateway: string;
  public subMask: string;      
  public idConfiguracion: string;

  public constructor(init?: Partial<Dispositivo>) {
    Object.assign(this, init);
  }
}
