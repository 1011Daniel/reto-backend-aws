import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Appointment } from "src/domain/entities/appointment.entity";
import { EventPublisherService } from "src/domain/services/event-publisher.service";

export class EventBridgePublisherService extends EventPublisherService {
  private client = new EventBridgeClient({});

  async publishAppointmentCreated(appointment: Appointment): Promise<void> {
    await this.client.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: "appointments.worker",
            DetailType: "AppointmentInserted",
            Detail: JSON.stringify(appointment),
            EventBusName: process.env.EVENT_BUS_NAME,
          },
        ],
      })
    );

    console.log("Enviado a EventBridge:", appointment);
  }
}