import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";

@Injectable()
export class UpdateAppointmentStateUseCase {
  constructor(private readonly appointmentRepo: AppointmentRepository) {}

  async execute(aptId: string, newState: string): Promise<void> {
    await this.appointmentRepo.updateState(aptId, newState);
  }
}