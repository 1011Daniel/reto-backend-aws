import { Appointment } from "../entities/appointment.entity";

export abstract class AppointmentMysqlRepository {
  abstract save(appointment: Appointment): Promise<void>;
}