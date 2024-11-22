"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const signale_1 = require("signale");
const dotenv = __importStar(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const Ruter_1 = require("./notificationes/infraestructure/Ruter");
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
dotenv.config();
const app = (0, express_1.default)();
app.use(helmet_1.default.hidePoweredBy());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/notification", Ruter_1.router);
const optionsHTTPS = {
    key: fs_1.default.readFileSync(String(process.env.RUTA_KEY)),
    cert: fs_1.default.readFileSync(String(process.env.RUTA_CERTIFICADO))
};
const options = {
    secrets: ["([0-9]{4}-?)+"],
};
const logger = new signale_1.Signale(options);
const port = process.env.PORT;
https_1.default.createServer(optionsHTTPS, app).listen(port, () => {
    logger.success("server listening on port:", port);
});
