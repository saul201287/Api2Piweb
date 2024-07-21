import { ISendSMS } from "../../domain/services/ISendSMS";

export class SendWhatsAppMessage {
  constructor(readonly sendSMS: ISendSMS) {}
  async run(id_user: string, data: string): Promise<boolean | string> {
    try {
      const status = await this.sendSMS.sendWhatsAppMessage(id_user, data);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
