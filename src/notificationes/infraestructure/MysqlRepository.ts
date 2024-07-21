import { NotificationRepository } from "../domain/NotificationRepository";
import { query } from "../../database/mysql";
import { Notification } from "../domain/Notification";

export class MysqRepository implements NotificationRepository {
  async saveData(notification: Notification): Promise<boolean | string> {
    const fecha = new Date();

    const sql =
      "INSERT INTO powerwatch.historialsensores (id, id_user,ampers,consumokwh,whs,voltaje,fecha) VALUES (?,?,?,?,?,?,?)";
    const params = [
      notification.id,
      notification.id_user,
      notification.ampers,
      notification.consumo_kwh,
      notification.whs,
      notification.voltaje,
      fecha,
    ];
    try {
      const [result]: any = await query(sql, params);
      const data: any = Object.values(JSON.parse(JSON.stringify(result)));
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async alertUserApp(
    id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string
  ): Promise<boolean | string> {
    const fecha = new Date();
    const sql =
      "INSERT INTO notification (id, id_user,cuerpo,titulo,tipo,fecha) VALUES (?,?,?,?,?,?)";
    const sql2 =
      "INSERT INTO incidencias (id, id_user,tipo,valor,fecha) VALUES (?,?,?,?,?)";
    const params = [0, id_user, cuerpo, titulo, tipo, fecha];
    const params2 = [0, id_user, tipo, cuerpo, fecha];
    try {
      await query(sql, params);
      await query(sql2, params2);
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
  async alertOffSystem(
    id_user: string,
    tipo: string,
    mssg: string
  ): Promise<boolean | string> {
    const fecha = new Date();
    const sql =
      "INSERT INTO notification (id, id_user,cuerpo,titulo,tipo,fecha) VALUES (?,?,?,?,?,?)";
    const params = [0, id_user, mssg, "Apagao de emergencia", tipo, fecha];
    try {
      const [data]: any = await query(sql, params);
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
