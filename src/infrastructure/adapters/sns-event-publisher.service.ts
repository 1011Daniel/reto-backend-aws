import { Injectable } from "@nestjs/common";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { EventPublisherService } from "src/domain/services/event-publisher.service";
import { Appointment } from "src/domain/entities/appointment.entity";

@Injectable()
export class SnsEventPublisherService extends EventPublisherService {
  private sns = new SNSClient({});

  async publishAppointmentCreated(appointment: Appointment): Promise<void> {
    await this.sns.send(
      new PublishCommand({
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify(appointment),
        MessageAttributes: {
          countryISO: {
            DataType: "String",
            StringValue: appointment.countryISO,
          },
        },
      })
    );
  }
}