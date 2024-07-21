import { Notification } from "../domain/Notification";
import { NotificationRepository } from "../domain/NotificationRepository";
import { AlertUserAppUseCase } from "./AlertUserAppUseCase";
import { IGeneratorId } from "./services/IGeneratorId";
import { SendDatasWS } from "./services/SendDatasWS";
let vol = 0,
  wht = 0,
  amp = 0;
let volB = 0,
  whtB = 0,
  ampB = 0;
export class SaveData {
  constructor(
    readonly notification: NotificationRepository,
    readonly idG: IGeneratorId,
    readonly alert: AlertUserAppUseCase,
    readonly sendDataWS: SendDatasWS
  ) {}
  async run(notification: Notification): Promise<Notification | string> {
    try {
      const id = this.idG.asignarId();
      const ws = await this.sendDataWS.run(
        notification.id_user,
        notification.consumo_kwh,
        notification.whs,
        notification.ampers,
        notification.voltaje
      );
      const datas = new Notification(
        id,
        notification.id_user,
        notification.consumo_kwh,
        notification.whs,
        notification.ampers,
        notification.voltaje
      );
      const status = await this.notification.saveData(datas);

      if (notification.voltaje > 110) {
        vol++;
        if (vol >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Voltaje alto",
            `Alerta de voltaje alto, valor detectado: ${notification.voltaje} V`
          );
          vol = 0;
        }
      }
      if (notification.ampers > 15) {
        amp++;
        if (amp >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Amperajes alto",
            `Alerta de amperaje alto, valor detectado: ${notification.ampers} A`
          );
          amp = 0;
        }
      }
      if (notification.whs > 100) {
        wht++;
        if (wht >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Watts alto",
            `Alerta de watts alto, valor detectado: ${notification.whs} W`
          );
          wht = 0;
        }
      }

      if (notification.voltaje < 80) {
        volB++;
        if (volB >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Voltaje muy bajo",
            `Alerta de voltaje muy bajo, valor detectado: ${notification.voltaje} V`
          );
          volB = 0;
        }
      }
      if (notification.ampers < 13) {
        ampB++;
        if (ampB >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Amperajes muy bajo",
            `Alerta de amperaje muy bajo, valor detectado: ${notification.ampers} A`
          );
          ampB = 0;
        }
      }
      if (notification.whs < 75) {
        whtB++;
        if (whtB >= 6) {
          await this.alert.run(
            notification.id_user,
            "Advertencia",
            "Watts muy bajo",
            `Alerta de watts muy bajo, valor detectado: ${notification.whs} W`
          );
          whtB = 0;
        }
      }

     if (typeof status !="string") {
      
      return datas;
     } else {
      return status
     }
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
