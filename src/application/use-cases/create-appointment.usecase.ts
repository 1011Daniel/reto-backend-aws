import { Injectable} from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";
import { EventPublisherService } from "src/domain/services/event-publisher.service";
import { Appointment } from "src/domain/entities/appointment.entity";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CreateAppointmentUseCase{
    constructor(
        private readonly appointmentRepo: AppointmentRepository,
        private readonly eventPublisher:EventPublisherService
    ){}

    async execute(insuredId: string, scheduleId: number, countryISO: string):Promise<Appointment>{
        
        const appointment = new Appointment(uuidv4(),insuredId,scheduleId,countryISO,'pending');
        // Guardar dynamodb
        await this.appointmentRepo.save(appointment);
        // Publicar en SNS
        await this.eventPublisher.publishAppointmentCreated(appointment);
        
        return appointment;
    }
}