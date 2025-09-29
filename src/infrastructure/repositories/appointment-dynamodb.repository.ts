import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment.repository";
import { Appointment } from "src/domain/entities/appointment.entity";
import { DynamoDBClient,PutItemCommand,UpdateItemCommand,QueryCommand  } from "@aws-sdk/client-dynamodb";

@Injectable()
export class AppointmentDynamoDBRepository extends AppointmentRepository{

    private readonly client = new DynamoDBClient({});

    async save(appointment:Appointment):Promise<void>{
        try{
        const command = new PutItemCommand({
             TableName: process.env.DYNAMO_TABLE,
                Item: {
                apt_id: { S: appointment.apt_id },
                insuredId: { S: appointment.insuredId },
                scheduleId: { N: appointment.scheduleId.toString() },
                countryISO: { S: appointment.countryISO },
                state: { S: appointment.state },
            },
        })
            await this.client.send(command);
            console.log("Guardado en DynamoDB:", appointment);
        }
        catch(err){
            console.error("Error DynamoDB:", err);
            throw err;
        }
    }

    async updateState(aptId: string, state: string): Promise<void> {
        const tableName = process.env.DYNAMO_TABLE!;
        await this.client.send(
        new UpdateItemCommand({
            TableName: tableName,
            Key: { apt_id: { S: aptId } },
            UpdateExpression: "SET #s = :state",
            ExpressionAttributeNames: { "#s": "state" },
            ExpressionAttributeValues: { ":state": { S: state } },
            })
        );
        console.log(`Se actualizo DynamoDB: ${aptId} -> ${state}`);
  }

    async findByInsuredId(insuredId: string): Promise<any[]> {
        const tableName = process.env.DYNAMO_TABLE!;
        const result = await this.client.send(
        new QueryCommand({
            TableName: tableName,
            IndexName: "InsuredIdIndex",
            KeyConditionExpression: "insuredId = :id",
            ExpressionAttributeValues: {
            ":id": { S: insuredId },
            },
        })
        );

        return (
            result.Items?.map((item) => ({
                apt_id: item.apt_id.S,
                insuredId: item.insuredId.S,
                scheduleId: Number(item.scheduleId.N),
                countryISO: item.countryISO.S,
                state: item.state.S,
            })) || []
        );
    }
}