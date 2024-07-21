import { AlertUserAppUseCase } from "../application/AlertUserAppUseCase";
import { AlertOffSystemUseCase } from "../application/AlertOffSystemUseCase";
import { SaveData } from "../application/SaveDataUseCase";
import { SaveDataController } from "./controllers/SaveDataController";
import { AlertOffSystemController } from "./controllers/AlertOffSystemController";
import { MysqRepository } from "./MysqlRepository";
import { IdServices } from "./helpers/ServicesUuidv4";
import { SendAlert } from "../application/services/SendAlert";
import { SendOff } from "../application/services/SendOffEmail";
import { ServicesNodeMailer } from "./ServicesNodeMailer";
import { SendDatasWS } from "../application/services/SendDatasWS";
import { SendNotificationWS } from "../application/services/SendNotificationWS";
import { ConnetWS } from "./ConnetWS";
import { SendWhatsAppMessage } from "../application/services/SendWhatsAppMessage";
import { SendWhatsAppMessageOff } from "../application/services/SendWhatsAppMessageOff";
import { TwilioServices } from "./TwilioServices";

const mysql = new MysqRepository();
const wsconnect = new ConnetWS();
const nodeMailer = new ServicesNodeMailer();
const idServices = new IdServices();
const twilio = new TwilioServices();

const sendDataWS = new SendDatasWS(wsconnect);
const sendNotificationWS = new SendNotificationWS(wsconnect);

const sendAlert = new SendAlert(nodeMailer);
const sendOff = new SendOff(nodeMailer);

const sendWhatsAppMessage = new SendWhatsAppMessage(twilio);
const sendWhatsAppMessageOff = new SendWhatsAppMessageOff(twilio);

const alertUserAppUseCase = new AlertUserAppUseCase(
  mysql,
  sendWhatsAppMessage,
  sendAlert,
  sendNotificationWS
);
const alertOffSystemUseCase = new AlertOffSystemUseCase(
  mysql,
  sendWhatsAppMessageOff,
  sendNotificationWS,
  sendOff
);
const saveData = new SaveData(
  mysql,
  idServices,
  alertUserAppUseCase,
  sendDataWS
);

export const alertOffSystemController = new AlertOffSystemController(
  alertOffSystemUseCase
);
export const saveDataController = new SaveDataController(saveData);
