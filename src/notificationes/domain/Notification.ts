export class Notification {
  constructor(
    readonly id: string,
    readonly id_user: string,
    readonly consumo_kwh: number,
    readonly whs: number,
    readonly ampers: number,
    readonly voltaje: number
  ) {}
}
