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
exports.AlertOffSystemController = void 0;
class AlertOffSystemController {
    constructor(alert) {
        this.alert = alert;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const status = yield this.alert.run(data.id_user, data.tipo, data.mssg);
                if (typeof status != "string") {
                    res.status(201).json({
                        messages: "Notificado con exito"
                    });
                }
                else {
                    res.status(409).json({
                        error: status
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    error: error
                });
            }
        });
    }
}
exports.AlertOffSystemController = AlertOffSystemController;
