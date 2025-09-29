import { AppointmentMysqlRepository } from "src/domain/repositories/appointment-mysql.repository";
import { Appointment } from "src/domain/entities/appointment.entity";
// import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
// import * as mysql from "mysql2/promise";


export class MysqlPeRepository extends AppointmentMysqlRepository{

    // Para poder conectar con la rds, se debe manejar las credenciales en Secret Manager
    // Se plantea una estructura para conexion
    // Esquema secret "rds/mysql_pe"
    //   {
    //   "host": "mysql-pe.xxxx.rds.amazonaws.com",
    //   "username": "admin",
    //   "password": "supersecret",
    //   "dbname": "db_pe"
    //    }

    // private secretsClient = new SecretsManagerClient({});

    // private async getConfig() {
    //     const res = await this.secretsClient.send(
    //     new GetSecretValueCommand({ SecretId: "rds/mysql_pe" })
    //     );
    //     if (!res.SecretString) throw new Error("Secret empty");
    //     return JSON.parse(res.SecretString);
    // }

    async save(appointment:Appointment):Promise<void>{
        // const config = await this.getConfig();

        // const connection = await mysql.createConnection({
        //     host: config.host,
        //     user: config.username,
        //     password: config.password,
        //     database: config.dbname,
        // });

        // await connection.execute(`INSERT INTO appointment VALUES (?, ?, ?, ?, ?,?)`,[]);

        // await connection.end();
        console.log("Insertando Appointment en PE",appointment);

    }
}