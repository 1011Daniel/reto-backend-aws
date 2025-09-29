import { Module } from '@nestjs/common';
import { CreateAppointmentUseCase } from 'src/application/use-cases/create-appointment.usecase';
import { FindAppointmentsByInsuredUseCase } from 'src/application/use-cases/find-appointments-by-insured.usecase';
import { AppointmentDynamoDBRepository } from 'src/infrastructure/repositories/appointment-dynamodb.repository';
// import { AppointmentConsoleRepository } from 'src/infrastructure/repositories/appointment-console.repository';
import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { AppointmentController } from './controllers/appointment.controller';
import { EventPublisherService } from 'src/domain/services/event-publisher.service';
import { SnsEventPublisherService } from 'src/infrastructure/adapters/sns-event-publisher.service';

@Module({
    controllers:[AppointmentController],
    providers:[
        CreateAppointmentUseCase,
        FindAppointmentsByInsuredUseCase,
        {provide:AppointmentRepository,useClass:AppointmentDynamoDBRepository},
        {provide:EventPublisherService,useClass:SnsEventPublisherService}
    ]
})
export class ApiModule {}
