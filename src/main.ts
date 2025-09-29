import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validar DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              
      forbidNonWhitelisted: true,   
      transform: true,              
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Reto tecnico')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Puerto 
  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `APIs http://localhost:${process.env.PORT ?? 3001}`,
  );
  console.log(
    `Swagger http://localhost:${process.env.PORT ?? 3001}/docs`,
  );
}
bootstrap();
