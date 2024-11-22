"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor(id, id_user, consumo_kwh, whs, ampers, voltaje) {
        this.id = id;
        this.id_user = id_user;
        this.consumo_kwh = consumo_kwh;
        this.whs = whs;
        this.ampers = ampers;
        this.voltaje = voltaje;
    }
}
exports.Notification = Notification;
