import { NotificationRepository } from "../domain/NotificationRepository";
import { SendWhatsAppMessageOff } from "./services/SendWhatsAppMessageOff";
import {SendNotificationWS} from "./services/SendNotificationWS"
import { SendOff } from "./services/SendOffEmail";

export class AlertOffSystemUseCase {
  constructor(
    readonly notification: NotificationRepository,
    readonly senWhat: SendWhatsAppMessageOff,
    readonly sendws: SendNotificationWS,
    readonly email: SendOff
  ) {}
  async run(
    id_user: string,
    tipo: string,
    mssg: string
  ): Promise<boolean | string> {
    try {
      const status = await this.notification.alertOffSystem(
        id_user,
        tipo,
        mssg
      );
      await this.email.run(id_user, mssg);
      await this.sendws.run(id_user,tipo,mssg)
      await this.senWhat.run(id_user, "Advertencia : " + mssg); 
      if (typeof status != "string") {
        return status;
      } else {
        return status;
      }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
