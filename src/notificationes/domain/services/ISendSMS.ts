export interface ISendSMS {
  sendWhatsAppMessage(id_user: string, data:string): Promise<boolean | string>;
  sendWhatsAppMessageOff(id_user: string, data:string): Promise<boolean | string>;
}
