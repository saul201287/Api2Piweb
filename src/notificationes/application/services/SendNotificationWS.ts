import { ISendDataWebSocket } from "../../domain/services/ISendDataWebSocket";

export class SendNotificationWS {
  constructor(readonly sendData: ISendDataWebSocket) {}
  async run(
    id_user: string,
    tipo: string,
    data: string
  ): Promise<boolean | string> {
    try {
      const status = await this.sendData.senNotification(id_user, tipo, data);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
