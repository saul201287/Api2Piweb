import { ISendMail } from "../domain/services/ISendMail";
import nodemailer from "nodemailer";
import { query } from "../../database/mysql";

async function sql(id_user: string) {
  try {
    const sql = `SELECT email, name FROM users WHERE idUsers = ?`;
    const params = [id_user];
    const [result]: any = await query(sql, params);
    if (result.length > 0) {
      return [result[0].email, result[0].name];
    }
    return null;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    return null;
  }
}

async function verify(transporter: nodemailer.Transporter): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("Conectado al servidor SMTP");
    return true;
  } catch (error) {
    console.error("Error al conectar con el servidor SMTP:", error);
    return false;
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: Number(process.env.PORT_EMAIL),
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

export class ServicesNodeMailer implements ISendMail {
  async sendAlert(
    id_user: string,
    tipo: string,
    titulo: string,
    cuerpo: string
  ): Promise<boolean | string> {
    try {
      const data = await sql(id_user);
      if (!data) {
        console.error("No se encontraron datos para el usuario:", id_user);
        return false;
      }

      const [email, name] = data;

      const isVerified: boolean = await verify(transporter);
      if (!isVerified) {
        return false;
      }

      const info = await transporter.sendMail({
        from: process.env.TO_EMAIL,
        to: email,
        subject: `⚠️ ${tipo} Revisa el sistema de rastreo, ${name} ⚠️`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px;">
            <h2 style="color: #0056b3;">${titulo} 📢</h2>
            <p style="color: #333; font-size: 16px;">${cuerpo}</p>
            <div style="margin-top: 20px;">
              <p style="color: #555; font-size: 14px;">Saludos,</p>
              <p style="color: #555; font-size: 14px;"><b>El equipo de Rastreo 🚀</b></p>
            </div>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error("Error enviando el correo:", error);
      return false;
    }
  }
  async senndOff(id_user: string, mssg: string): Promise<boolean | string> {
    try {
      const data = await sql(id_user);
      if (!data) {
        console.error("No se encontraron datos para el usuario:", id_user);
        return false;
      }

      const [email, name] = data;

      const isVerified: boolean = await verify(transporter);
      if (!isVerified) {
        return false;
      }
      const info = await transporter.sendMail({
        from: process.env.TO_EMAIL,
        to: email,
        subject: `⚠️ El sistema se detuvo ${name} ⚠️`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #0056b3; text-align: center;">El sistema de emergencia de bloqueo preventivo se activó 📢</h2>
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Estimado/a ${name},<br><br>
              ${mssg}
            </p>
            <div style="margin-top: 20px; text-align: center;">
              <p style="color: #555; font-size: 14px;">Saludos,</p>
              <p style="color: #555; font-size: 14px;"><b>El equipo de Rastreo 🚀</b></p>
            </div>
          </div>
        `,
      });
      return true;
    } catch (error) {
      console.error(error);
      return "error: " + error;
    }
  }
}
