import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber,IsIn } from 'class-validator';

export class CreateAppointmentDto{
    @ApiProperty({example:'00001',description:'código del asegurado de 5 dígitos (puede tener ceros por delante)'})
    @IsString()
    insureId:string;

    @ApiProperty({example:'10',description:`identificador o llave del espacio para agendar una cita. “Espacio” es el 
    conjunto de 4 campos (centro médico, especialidad, médico y fecha y hora). `})
    @IsNumber()
    scheduleId: number;    

    @ApiProperty({example:'PE',description:'identificador de país. Solo puede ser o “PE” o “CL” '})
    @IsString()
    @IsIn(["PE", "CL"])
    countryISO: string;

}