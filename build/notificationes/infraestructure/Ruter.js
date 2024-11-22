"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Dependencies_1 = require("./Dependencies");
exports.router = express_1.default.Router();
exports.router.post("/data", (req, res) => {
    Dependencies_1.saveDataController
        .run(req, res)
        .then((pay) => {
        return pay;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
exports.router.post("/alert", (req, res) => {
    Dependencies_1.alertOffSystemController
        .run(req, res)
        .then((pay) => {
        return pay;
    })
        .catch((err) => {
        res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
