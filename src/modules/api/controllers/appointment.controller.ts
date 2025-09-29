import { Body,Controller,Post,Get,Param } from "@nestjs/common";
import { CreateAppointmentDto } from "../dtos/create-appointment.dto";
import { CreateAppointmentUseCase } from "src/application/use-cases/create-appointment.usecase";
import { FindAppointmentsByInsuredUseCase } from "src/application/use-cases/find-appointments-by-insured.usecase";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController{
    constructor(
        private readonly createAppointment:CreateAppointmentUseCase,
        private readonly findAppointments:FindAppointmentsByInsuredUseCase
    ){}

    @Post()
    async create(@Body() dto:CreateAppointmentDto){

        const appointment = await this.createAppointment.execute(
            dto.insureId,
            dto.scheduleId,
            dto.countryISO
        );

        return {message:'OK',apt_id:appointment.apt_id};
    }

    @Get(":insuredId")
    async findAll(@Param("insuredId") insuredId: string) {
        const appointments = await this.findAppointments.execute(insuredId);
        return { appointments };
    }

}