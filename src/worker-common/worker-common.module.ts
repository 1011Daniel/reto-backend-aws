import { Module } from '@nestjs/common';
import { UpdateAppointmentStateUseCase } from 'src/application/use-cases/update-appointment-state.usecase';
import { AppointmentRepository } from 'src/domain/repositories/appointment.repository';
import { AppointmentDynamoDBRepository } from 'src/infrastructure/repositories/appointment-dynamodb.repository';

@Module({
    providers:[
        UpdateAppointmentStateUseCase,
        {provide:AppointmentRepository,useClass:AppointmentDynamoDBRepository}
    ]
})
export class WorkerCommonModule {}
