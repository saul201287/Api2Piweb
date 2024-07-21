import { ISendDataWebSocket } from "../domain/services/ISendDataWebSocket";
import { verify, sign, TokenExpiredError } from "jsonwebtoken";
import io from "socket.io-client";

const url: any = process.env.URL_WEBSOCKET;

function tokenCreate(id_user: string) {
  try {
    let secret: any = process.env.SECRET_KEY_TOKEN;
    const payload = { id_user };
    return sign(payload, secret, { expiresIn: "1h" });
  } catch (error) {
    console.error(error);
    return "error: " + error;
  }
}

export class ConnetWS implements ISendDataWebSocket {
  private socket: any;

  private connect(id_user: string): void {
    const token = tokenCreate(id_user);
    if (!this.socket || !this.socket.connected) {
      this.socket = io(url, {
        auth: { token },
        query: { id_user },
      });

      this.socket.on("connect", () => {
        console.log("Conexión establecida con el servidor de WebSocket");
      });

      this.socket.on("connect_error", (error: any) => {
        console.error("Error de conexión con el servidor de WebSocket:", error);
      });
    }
  }

  async senNotification(
    id_user: string,
    tipo: string,
    data: string
  ): Promise<boolean | string> {
    try {
      this.connect(id_user);
      this.socket.emit("notification-alert", { id_user, tipo, data });
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }

  async sendDatas(
    id_user: string,
    vrms: number,
    irms: number,
    kwh: number
  ): Promise<boolean | string> {
    try {
      this.connect(id_user);
      this.socket.emit("data", { id_user, vrms, irms, kwh });
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
