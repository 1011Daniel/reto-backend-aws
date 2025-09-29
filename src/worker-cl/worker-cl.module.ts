import { Module } from '@nestjs/common';
import { ProcessAppointmentUseCase } from 'src/application/use-cases/process-appointment.usecase';
import { AppointmentMysqlRepository } from 'src/domain/repositories/appointment-mysql.repository';
import { EventBridgePublisherService } from 'src/infrastructure/adapters/eventbridge-publisher.service';
import { MysqlClRepository } from 'src/infrastructure/repositories/process-mysql-cl.repository';
import { EventPublisherService } from 'src/domain/services/event-publisher.service';

@Module({
    providers:[
        ProcessAppointmentUseCase,
        {provide:AppointmentMysqlRepository,useClass:MysqlClRepository},
        {provide:EventPublisherService,useClass:EventBridgePublisherService}
    ]
})

export class WorkerClModule {}
