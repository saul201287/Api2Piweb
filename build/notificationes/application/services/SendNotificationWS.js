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
exports.SendNotificationWS = void 0;
class SendNotificationWS {
    constructor(sendData) {
        this.sendData = sendData;
    }
    run(id_user, tipo, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.sendData.senNotification(id_user, tipo, data);
                return status;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.SendNotificationWS = SendNotificationWS;
