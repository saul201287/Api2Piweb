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
exports.ServicesNodeMailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mysql_1 = require("../../database/mysql");
function sql(id_user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sql = `SELECT email, name FROM users WHERE idUsers = ?`;
            const params = [id_user];
            const [result] = yield (0, mysql_1.query)(sql, params);
            if (result.length > 0) {
                return [result[0].email, result[0].name];
            }
            return null;
        }
        catch (error) {
            console.error("Error en la consulta SQL:", error);
            return null;
        }
    });
}
function verify(transporter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield transporter.verify();
            console.log("Conectado al servidor SMTP");
            return true;
        }
        catch (error) {
            console.error("Error al conectar con el servidor SMTP:", error);
            return false;
        }
    });
}
const transporter = nodemailer_1.default.createTransport({
    host: process.env.HOST_EMAIL,
    port: Number(process.env.PORT_EMAIL),
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
    },
});
class ServicesNodeMailer {
    sendAlert(id_user, tipo, titulo, cuerpo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield sql(id_user);
                if (!data) {
                    console.error("No se encontraron datos para el usuario:", id_user);
                    return false;
                }
                const [email, name] = data;
                const isVerified = yield verify(transporter);
                if (!isVerified) {
                    return false;
                }
                const info = yield transporter.sendMail({
                    from: process.env.TO_EMAIL,
                    to: email,
                    subject: `⚠️ ${tipo} Revisa el sistema de rastreo, ${name} ⚠️`,
                    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
            <h2 style="color: #0056b3;">${titulo} 📢</h2>
            <p style="color: #333; font-size: 16px;">${cuerpo}</p>
            <div style="margin-top: 20px;">
              <p style="color: #555; font-size: 14px;">Saludos,</p>
              <p style="color: #555; font-size: 14px;"><b>El equipo de Rastreo 🚀</b></p>
            </div>
          </div>
        `,
                });
                return true;
            }
            catch (error) {
                console.error("Error enviando el correo:", error);
                return false;
            }
        });
    }
    senndOff(id_user, mssg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield sql(id_user);
                if (!data) {
                    console.error("No se encontraron datos para el usuario:", id_user);
                    return false;
                }
                const [email, name] = data;
                const isVerified = yield verify(transporter);
                if (!isVerified) {
                    return false;
                }
                const info = yield transporter.sendMail({
                    from: process.env.TO_EMAIL,
                    to: email,
                    subject: `⚠️ El sistema se detuvo ${name} ⚠️`,
                    html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #0056b3; text-align: center;">El sistema de emergencia de bloqueo preventivo se activó 📢</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Estimado/a ${name},<br><br>
              ${mssg}
            </p>
            <div style="margin-top: 20px; text-align: center;">
              <p style="color: #555; font-size: 14px;">Saludos,</p>
              <p style="color: #555; font-size: 14px;"><b>El equipo de Rastreo 🚀</b></p>
            </div>
          </div>
        `,
                });
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.ServicesNodeMailer = ServicesNodeMailer;
