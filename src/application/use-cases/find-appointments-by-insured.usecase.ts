import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";

@Injectable()
export class FindAppointmentsByInsuredUseCase {
  constructor(private readonly appointmentRepo: AppointmentRepository) {}

  async execute(insuredId: string) {
    return this.appointmentRepo.findByInsuredId(insuredId);
  }
}