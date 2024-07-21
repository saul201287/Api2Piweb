import express from "express";
import { saveDataController, alertOffSystemController } from "./Dependencies";

export const router = express.Router();

router.post("/data", (req, res) => {
  saveDataController
    .run(req, res)
    .then((pay) => {
      return pay;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

router.post("/alert", (req, res) => {
  alertOffSystemController
    .run(req, res)
    .then((pay) => {
      return pay;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
