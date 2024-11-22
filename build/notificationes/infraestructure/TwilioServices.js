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
exports.TwilioServices = void 0;
const twilio_1 = __importDefault(require("twilio"));
const mysql_1 = require("../../database/mysql");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
function sql(id_user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sql = "SELECT telefono FROM users WHERE idUsers = ?";
            const params = [id_user];
            const [result] = yield (0, mysql_1.query)(sql, params);
            if (result.length > 0) {
                return result[0].telefono;
            }
            else {
                console.error("Número de teléfono no encontrado");
                return null;
            }
        }
        catch (error) {
            console.error("Error en la consulta SQL:", error);
            return null;
        }
    });
}
function getTwilioClient() {
    return (0, twilio_1.default)(accountSid, authToken);
}
class TwilioServices {
    sendWhatsAppMessage(id_user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const to = yield sql(id_user);
            if (!to) {
                return "Error: número de teléfono no encontrado";
            }
            const client = getTwilioClient();
            try {
                yield client.messages.create({
                    from: "whatsapp:+14155238886",
                    to: `whatsapp:+521${to}`,
                    body: data,
                }).then(message => {
                    console.log("Mensaje enviado, SID:", message.sid);
                }).catch(error => {
                    console.error("Error al enviar el mensaje:", error);
                    throw error;
                });
                return true;
            }
            catch (error) {
                console.error("Error al enviar el mensaje:", error);
                return "error: " + error;
            }
        });
    }
    sendWhatsAppMessageOff(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const to = yield sql(id_user);
            if (!to) {
                return "Error: número de teléfono no encontrado";
            }
            const body = `Por emergencia la alimentación eléctrica fue detenida e 
        intervenida debido a los flujos irregulares del sistema eléctrico`;
            const client = getTwilioClient();
            try {
                yield client.messages.create({
                    from: "whatsapp:+14155238886",
                    to: `whatsapp:+521${to}`,
                    body: body,
                }).then(message => {
                    console.log("Mensaje enviado, SID:", message.sid);
                }).catch(error => {
                    console.error("Error al enviar el mensaje:", error);
                    throw error;
                });
                return true;
            }
            catch (error) {
                console.error("Error al enviar el mensaje:", error);
                return "error: " + error;
            }
        });
    }
}
exports.TwilioServices = TwilioServices;
