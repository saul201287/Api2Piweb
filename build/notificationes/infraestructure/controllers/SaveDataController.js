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
exports.SaveDataController = void 0;
const Notification_1 = require("../../domain/Notification");
class SaveDataController {
    constructor(saveData) {
        this.saveData = saveData;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const notification = new Notification_1.Notification("", data.id_user, data.consumo_kwh, data.whs, data.ampers, data.voltaje);
                const status = yield this.saveData.run(notification);
                if (typeof status != "string") {
                    res.status(201).json({
                        messages: "Datos guardados",
                    });
                }
                else {
                    res.status(409).json({
                        messages: status,
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    error: error,
                });
            }
        });
    }
}
exports.SaveDataController = SaveDataController;
