import { SQSEvent } from "aws-lambda";
import { NestFactory } from "@nestjs/core";
import { WorkerPeModule } from "./worker-pe/worker-pe.module";
import { WorkerClModule } from "./worker-cl/worker-cl.module";
import { WorkerCommonModule } from "./worker-common/worker-common.module";
import { ProcessAppointmentUseCase } from "./application/use-cases/process-appointment.usecase";
import { UpdateAppointmentStateUseCase } from "./application/use-cases/update-appointment-state.usecase";
import { Appointment } from "./domain/entities/appointment.entity";

export const appointmentPeHandler = async (event: SQSEvent) => {
  const app = await NestFactory.createApplicationContext(WorkerPeModule);
  const useCase = app.get(ProcessAppointmentUseCase);

 for (const record of event.Records) {
    try {

      const notification = JSON.parse(record.body);

      // Parsear del SQS
      const data = JSON.parse(notification.Message);

      // Reconstruir objeto
      const appointment = new Appointment(
        data.apt_id,
        data.insuredId,
        data.scheduleId,
        data.countryISO,
        data.state
      );

      await useCase.execute(appointment);

    } catch (err) {
      // Aqui podemos descartar o mandar al Dead Letter Queue 
      console.error("Error al procesar mensaje de PE", err, record.body);

    }
  }

  await app.close();
};

export const appointmentClHandler = async (event: SQSEvent) => {
  const app = await NestFactory.createApplicationContext(WorkerClModule);
  const useCase = app.get(ProcessAppointmentUseCase);

  for (const record of event.Records) {
    try {

      const notification = JSON.parse(record.body);

      // Parsear del SQS
      const data = JSON.parse(notification.Message);

      // Reconstruir objeto
      const appointment = new Appointment(
        data.apt_id,
        data.insuredId,
        data.scheduleId,
        data.countryISO,
        data.state
      );

      await useCase.execute(appointment);

    } catch (err) {
      // Aqui podemos descartar o mandar al Dead Letter Queue 
      console.error("Error al procesar mensaje de CL", err, record.body);

    }
  }

  await app.close();
};

export const appointmentCommonHandler = async (event: SQSEvent) => {
  const app = await NestFactory.createApplicationContext(WorkerCommonModule);
  const useCase = app.get(UpdateAppointmentStateUseCase);

  for (const record of event.Records) {
    const body = JSON.parse(record.body);

    // EventBridge entrega el payload en `detail`
    const detail = body.detail;
    const aptId = detail.apt_id;
    console.log("Mensaje recibido de EventBridge:", detail);

    await useCase.execute(aptId, "completed");
  }

  await app.close();
};