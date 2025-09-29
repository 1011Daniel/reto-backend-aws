import { Injectable } from "@nestjs/common";
import { Appointment } from "src/domain/entities/appointment.entity";
import { AppointmentMysqlRepository } from "src/domain/repositories/appointment-mysql.repository";
import { EventPublisherService } from "src/domain/services/event-publisher.service";

@Injectable()
export class ProcessAppointmentUseCase{
    constructor(
        private readonly mysqlRepo:AppointmentMysqlRepository,
        private readonly eventPublisher: EventPublisherService
    ){}

    async execute(appointment:Appointment):Promise<void>{

        // Aqui mandamos a mysql, cada sqs mandara a su lambda respectivo y el proceso variara dependiendo
        // de que modulo se use PE o CL
        // Insertar en RDS
        await this.mysqlRepo.save(appointment);
        // Mandar a EventBridge
        await this.eventPublisher.publishAppointmentCreated(appointment);
    }

}