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
exports.AlertOffSystemUseCase = void 0;
class AlertOffSystemUseCase {
    constructor(notification, senWhat, sendws, email) {
        this.notification = notification;
        this.senWhat = senWhat;
        this.sendws = sendws;
        this.email = email;
    }
    run(id_user, tipo, mssg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield this.notification.alertOffSystem(id_user, tipo, mssg);
                yield this.email.run(id_user, mssg);
                yield this.sendws.run(id_user, tipo, mssg);
                yield this.senWhat.run(id_user, "Advertencia : " + mssg);
                if (typeof status != "string") {
                    return status;
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
exports.AlertOffSystemUseCase = AlertOffSystemUseCase;
