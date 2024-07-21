import { ISendSMS } from "../domain/services/ISendSMS";
import twilio from "twilio";
import { query } from "../../database/mysql";
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

async function sql(id_user: string): Promise<string | null> {
  try {
    const sql = "SELECT telefono FROM users WHERE idUsers = ?";
    const params = [id_user];
    const [result]: any = await query(sql, params);
    if (result.length > 0) {
      return result[0].telefono;
    } else {
      console.error("Número de teléfono no encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    return null;
  }
}

function getTwilioClient() {
  return twilio(accountSid, authToken);
}

export class TwilioServices implements ISendSMS {

  async sendWhatsAppMessage(
    id_user: string,
    data: string
  ): Promise<boolean | string> {
    const to = await sql(id_user);
    if (!to) {
      return "Error: número de teléfono no encontrado";
    }
    const client = getTwilioClient();

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:+521${to}`,
        body: data,
      }).then(message => {
        console.log("Mensaje enviado, SID:", message.sid);
      }).catch(error => {
        console.error("Error al enviar el mensaje:", error);
        throw error;
      });
      return true;
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      return "error: " + error;
    }
  }

  async sendWhatsAppMessageOff(id_user: string): Promise<boolean | string> {
    const to = await sql(id_user);
    if (!to) {
      return "Error: número de teléfono no encontrado";
    }

    const body = `Por emergencia la alimentación eléctrica fue detenida e 
        intervenida debido a los flujos irregulares del sistema eléctrico`;

    const client = getTwilioClient();

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:+521${to}`,
        body: body,
      }).then(message => {
        console.log("Mensaje enviado, SID:", message.sid);
      }).catch(error => {
        console.error("Error al enviar el mensaje:", error);
        throw error;
      });
      return true;
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      return "error: " + error;
    }
  }
}
