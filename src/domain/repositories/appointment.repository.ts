import { Appointment } from "../entities/appointment.entity";

export abstract class AppointmentRepository{

    abstract save(appointment:Appointment):Promise<void>; // DynamoDB, Console
    abstract updateState(aptId: string, state: string): Promise<void>; //DynamoDB
    abstract findByInsuredId(insuredId: string): Promise<any[]>;
}