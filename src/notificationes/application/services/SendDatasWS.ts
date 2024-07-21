import { ISendDataWebSocket } from "../../domain/services/ISendDataWebSocket";

export class SendDatasWS {
  constructor(readonly sendDta: ISendDataWebSocket) {}
  async run(
    id_user: string,
    consumo_kwh: number,
    whs: number,
    ampers: number,
    voltaje: number
  ): Promise<boolean | string> {
    try {
      const status = await this.sendDta.sendDatas(id_user, consumo_kwh, whs, ampers,voltaje);
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
