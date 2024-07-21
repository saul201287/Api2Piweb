export interface ISendDataWebSocket {
  sendDatas(
    id_user: string,
    consumo_kwh: number,
    whs: number,
    ampers: number,
    voltaje: number
  ): Promise<boolean | string>;
  senNotification(
    id_user: string,
    tipo: string,
    data: string
  ): Promise<boolean | string>;
}
