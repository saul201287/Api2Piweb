import { ISendSMS } from "../../domain/services/ISendSMS";

export class SendWhatsAppMessageOff {
  constructor(readonly isendSms: ISendSMS) {}
  async run(id_user: string, data:string): Promise<boolean | string> {
    try {
      const status = await this.isendSms.sendWhatsAppMessageOff(id_user,data);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
