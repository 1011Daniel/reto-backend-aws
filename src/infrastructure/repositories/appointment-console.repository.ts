import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";
import { Appointment } from "src/domain/entities/appointment.entity";

@Injectable()
export class AppointmentConsoleRepository extends AppointmentRepository{

    async save(appointment:Appointment):Promise<void>{

       console.log("Todo bien ");
       console.log(appointment);
    }
    async updateState(aptId: string, state: string): Promise<void> {
        console.log(aptId,state);
    }

    async findByInsuredId(insuredId: string): Promise<any[]> {
        return [];
    }
}