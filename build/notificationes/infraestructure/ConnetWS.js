"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnetWS = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const url = process.env.URL_WEBSOCKET;
function tokenCreate(id_user) {
    try {
        let secret = process.env.SECRET_KEY_TOKEN;
        const payload = { id_user };
        return (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: "1h" });
    }
    catch (error) {
        console.error(error);
        return "error: " + error;
    }
}
class ConnetWS {
    connect(id_user) {
        const token = tokenCreate(id_user);
        if (!this.socket || !this.socket.connected) {
            this.socket = (0, socket_io_client_1.default)(url, {
                auth: { token },
                query: { id_user },
            });
            this.socket.on("connect", () => {
                console.log("Conexión establecida con el servidor de WebSocket");
            });
            this.socket.on("connect_error", (error) => {
                console.error("Error de conexión con el servidor de WebSocket:", error);
            });
        }
    }
    senNotification(id_user, tipo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connect(id_user);
                this.socket.emit("notification-alert", { id_user, tipo, data });
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
    sendDatas(id_user, consumo_kwh, whs, ampers, voltaje) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connect(id_user);
                this.socket.emit("data", { id_user, consumo_kwh, whs, ampers, voltaje });
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.ConnetWS = ConnetWS;
