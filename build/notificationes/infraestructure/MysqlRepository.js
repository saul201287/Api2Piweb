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
exports.MysqRepository = void 0;
const mysql_1 = require("../../database/mysql");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
class MysqRepository {
    saveData(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = moment_timezone_1.default.tz('America/Mexico_City').format();
            const sql = "INSERT INTO powerwatch.historialsensores (id, id_user,ampers,consumokwh,whs,voltaje,fecha) VALUES (?,?,?,?,?,?,?)";
            const params = [
                notification.id,
                notification.id_user,
                notification.ampers,
                notification.consumo_kwh,
                notification.whs,
                notification.voltaje,
                fecha,
            ];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                const data = Object.values(JSON.parse(JSON.stringify(result)));
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
    alertUserApp(id_user, tipo, titulo, cuerpo) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = new Date();
            const sql = "INSERT INTO notification (id, id_user,cuerpo,titulo,tipo,fecha) VALUES (?,?,?,?,?,?)";
            const sql2 = "INSERT INTO incidencias (id, id_user,tipo,valor,fecha) VALUES (?,?,?,?,?)";
            const params = [0, id_user, cuerpo, titulo, tipo, fecha];
            const params2 = [0, id_user, tipo, cuerpo, fecha];
            try {
                yield (0, mysql_1.query)(sql, params);
                yield (0, mysql_1.query)(sql2, params2);
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
    alertOffSystem(id_user, tipo, mssg) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = moment_timezone_1.default.tz('America/Mexico_City').format();
            const sql = "INSERT INTO notification (id, id_user,cuerpo,titulo,tipo,fecha) VALUES (?,?,?,?,?,?)";
            const params = [0, id_user, mssg, "Apagao de emergencia", tipo, fecha];
            const sql2 = "INSERT INTO incidencias (id, id_user,tipo,valor,fecha) VALUES (?,?,?,?,?)";
            const params2 = [0, id_user, tipo, mssg, fecha];
            try {
                yield (0, mysql_1.query)(sql2, params2);
                const [data] = yield (0, mysql_1.query)(sql, params);
                return true;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.MysqRepository = MysqRepository;
