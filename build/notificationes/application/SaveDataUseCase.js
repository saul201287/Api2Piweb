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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveData = void 0;
const Notification_1 = require("../domain/Notification");
let vol = 0, wht = 0, amp = 0;
let volB = 0, whtB = 0, ampB = 0;
class SaveData {
    constructor(notification, idG, alert, sendDataWS) {
        this.notification = notification;
        this.idG = idG;
        this.alert = alert;
        this.sendDataWS = sendDataWS;
    }
    run(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = this.idG.asignarId();
                const ws = yield this.sendDataWS.run(notification.id_user, notification.consumo_kwh, notification.whs, notification.ampers, notification.voltaje);
                const datas = new Notification_1.Notification(id, notification.id_user, notification.consumo_kwh, notification.whs, notification.ampers, notification.voltaje);
                const status = yield this.notification.saveData(datas);
                if (notification.voltaje > 110) {
                    vol++;
                    if (vol >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Voltaje alto", `Alerta de voltaje alto, valor detectado: ${notification.voltaje} V`);
                        vol = 0;
                    }
                }
                if (notification.ampers > 15) {
                    amp++;
                    if (amp >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Amperajes alto", `Alerta de amperaje alto, valor detectado: ${notification.ampers} A`);
                        amp = 0;
                    }
                }
                if (notification.whs > 100) {
                    wht++;
                    if (wht >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Watts alto", `Alerta de watts alto, valor detectado: ${notification.whs} W`);
                        wht = 0;
                    }
                }
                if (notification.voltaje < 80) {
                    volB++;
                    if (volB >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Voltaje muy bajo", `Alerta de voltaje muy bajo, valor detectado: ${notification.voltaje} V`);
                        volB = 0;
                    }
                }
                if (notification.ampers < 13) {
                    ampB++;
                    if (ampB >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Amperajes muy bajo", `Alerta de amperaje muy bajo, valor detectado: ${notification.ampers} A`);
                        ampB = 0;
                    }
                }
                if (notification.whs < 75) {
                    whtB++;
                    if (whtB >= 6) {
                        yield this.alert.run(notification.id_user, "PICO", "Watts muy bajo", `Alerta de watts muy bajo, valor detectado: ${notification.whs} W`);
                        whtB = 0;
                    }
                }
                if (typeof status != "string") {
                    return datas;
                }
                else {
                    return status;
                }
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.SaveData = SaveData;
