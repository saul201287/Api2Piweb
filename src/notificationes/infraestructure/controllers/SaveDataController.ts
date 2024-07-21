import { Request, Response } from "express";
import { SaveData } from "../../application/SaveDataUseCase";
import { Notification } from "../../domain/Notification";

export class SaveDataController {
  constructor(readonly saveData: SaveData) {}
  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const notification= new Notification( "",
        data.id_user,
        data.consumo_kwh,
        data.whs,
        data.ampers,
        data.voltaje
      )
      const status = await this.saveData.run(
       notification
      );
      if (typeof status != "string") {
        res.status(201).json({
          messages: "Datos guardados",
        });
      } else {
        res.status(409).json({
          messages: status,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
