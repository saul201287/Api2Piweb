import { NotificationRepository } from "../domain/NotificationRepository";
import { SendWhatsAppMessage } from "./services/SendWhatsAppMessage";
import { SendAlert } from "./services/SendAlert";
import { SendNotificationWS } from "./services/SendNotificationWS";

export class AlertUserAppUseCase {
  constructor(
    readonly notification: NotificationRepository,
    readonly senWhat: SendWhatsAppMessage,
    readonly sendMail: SendAlert,
    readonly sendNWS: SendNotificationWS
  ) {}
  async run(
    id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string
  ): Promise<boolean | string> {
    try {
      const status = await this.notification.alertUserApp(
        id_user,
        tipo,
        titulo,
        cuerpo
      );
      await this.sendNWS.run(id_user, tipo, titulo + cuerpo);
      await this.sendMail.run(id_user, tipo,titulo, cuerpo);
      await this.senWhat.run(id_user,tipo+": " +titulo + ", " + cuerpo)
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
