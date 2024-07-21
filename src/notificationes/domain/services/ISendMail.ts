export interface ISendMail {
  sendAlert( id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string): Promise<boolean | string>;
    senndOff(id_user:string, data:string):Promise<boolean|string>
}
