import { ISendMail } from "../../domain/services/ISendMail";

export class SendOff{
    constructor(readonly imail:ISendMail){}
    async run(id_user:string, data:string):Promise<boolean|string>{
        try {
            const status = await this.imail.senndOff(id_user,data)
            return status
        } catch (error) {
            console.error(error);
            return "error: " + error;
        }
    }
}