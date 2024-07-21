import { ISendMail } from "../../domain/services/ISendMail";

export class SendAlert {
  constructor(readonly servicesEmail: ISendMail) {}
  async run(
    id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string
  ): Promise<boolean | string> {
    try {
      const status = await this.servicesEmail.sendAlert(
        id_user,
        tipo,
        titulo,
        cuerpo
      );
      return status;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
