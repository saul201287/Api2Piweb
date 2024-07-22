/*
import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors"
import { router } from "./notificationes/infraestructure/Ruter";

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
dotenv.config();
app.use(morgan("dev"));

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/notification",router)
const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);

const port: string | undefined = process.env.PORT;

app.listen(port, () => {
  logger.success("server listening on port:", port);
});
*/
//Configuracion de HTTPS

import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { router } from "./notificationes/infraestructure/Ruter";
import fs from "fs";
import https from "https"

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/notification", router);

const optionsHTTPS = {
  key: fs.readFileSync(String(process.env.RUTA_KEY)),
  cert: fs.readFileSync(String(process.env.RUTA_CERTIFICADO))
};

const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);

const port: string | undefined = process.env.PORT;

https.createServer(optionsHTTPS, app).listen(port, () => {
  logger.success("server listening on port:", port);
});
