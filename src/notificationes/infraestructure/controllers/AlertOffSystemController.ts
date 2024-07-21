import { Request, Response } from "express";
import { AlertOffSystemUseCase } from "../../application/AlertOffSystemUseCase";

export class AlertOffSystemController {
  constructor(readonly alert: AlertOffSystemUseCase) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const status = await this.alert.run(data.id_user, data.tipo, data.mssg);
      if (typeof status != "string") {
        res.status(201).json({
            messages:"Notificado con exito"
        })
      }else{
        res.status(409).json({
            error:status
        })
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error:error
        })
    }
  }
}
