import { Appointment } from "src/domain/entities/appointment.entity";

export abstract class EventPublisherService{
    abstract publishAppointmentCreated(appointment:Appointment):Promise<void>;
}