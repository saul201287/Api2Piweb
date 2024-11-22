"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdServices = void 0;
const uuid_1 = require("uuid");
class IdServices {
    asignarId() {
        const id = (0, uuid_1.v4)();
        return id;
    }
}
exports.IdServices = IdServices;
