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
exports.AlertUserAppUseCase = void 0;
class AlertUserAppUseCase {
    constructor(notification, senWhat, sendMail, sendNWS) {
        this.notification = notification;
        this.senWhat = senWhat;
        this.sendMail = sendMail;
        this.sendNWS = sendNWS;
    }
    run(id_user, tipo, titulo, cuerpo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.notification.alertUserApp(id_user, tipo, titulo, cuerpo);
                yield this.sendNWS.run(id_user, tipo, titulo + cuerpo);
                yield this.sendMail.run(id_user, tipo, titulo, cuerpo);
                yield this.senWhat.run(id_user, tipo + ": " + titulo + ", " + cuerpo);
                return status;
            }
            catch (error) {
                console.error(error);
                return "error: " + error;
            }
        });
    }
}
exports.AlertUserAppUseCase = AlertUserAppUseCase;
