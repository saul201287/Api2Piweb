import { Notification } from "./Notification";

export interface NotificationRepository {
  saveData(notification: Notification): Promise<boolean | string>;
  alertUserApp(
    id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string
  ): Promise<boolean | string>;
  alertOffSystem(
    id_user: string,
    tipo: string,
    mssg: string
  ): Promise<boolean | string>;
}
