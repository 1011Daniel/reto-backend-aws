import { UpdateAppointmentStateUseCase } from "src/application/use-cases/update-appointment-state.usecase";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";

class MockAppointmentRepo extends AppointmentRepository {
  public updated: { aptId: string; state: string } | null = null;

  async save(): Promise<void> {}
  async findByInsuredId(): Promise<any[]> { return []; }

  async updateState(aptId: string, state: string): Promise<void> {
    this.updated = { aptId, state };
  }
}

describe("UpdateAppointmentStateUseCase", () => {
  it("Actualizar appointment", async () => {
    const repo = new MockAppointmentRepo();
    const useCase = new UpdateAppointmentStateUseCase(repo);

    await useCase.execute("apt123", "confirmed");

    expect(repo.updated).toEqual({ aptId: "apt123", state: "confirmed" });
  });
});