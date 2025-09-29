import { CreateAppointmentUseCase } from "src/application/use-cases/create-appointment.usecase";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";
import { EventPublisherService } from "src/domain/services/event-publisher.service";
import { Appointment } from "src/domain/entities/appointment.entity";

class MockAppointmentRepo extends AppointmentRepository {
  public saved: Appointment | null = null;

  async save(appointment: Appointment): Promise<void> {
    this.saved = appointment;
  }
  async updateState(): Promise<void> {}
  async findByInsuredId(): Promise<Appointment[]> { return []; }
}

class MockEventPublisher extends EventPublisherService {
  public published: Appointment | null = null;

  async publishAppointmentCreated(appointment: Appointment): Promise<void> {
    this.published = appointment;
  }
}

describe("CreateAppointmentUseCase", () => {
  it("Crear, guardar y publicar un appointment", async () => {
    const repo = new MockAppointmentRepo();
    const publisher = new MockEventPublisher();

    const useCase = new CreateAppointmentUseCase(repo, publisher);

    const appointment = await useCase.execute("00001", 123, "PE");

    expect(appointment.insuredId).toBe("00001");
    expect(appointment.scheduleId).toBe(123);
    expect(appointment.countryISO).toBe("PE");

    // Validar repo.save
    expect(repo.saved).toEqual(appointment);

    // Validar eventPublisher.publish
    expect(publisher.published).toEqual(appointment);
  });
});