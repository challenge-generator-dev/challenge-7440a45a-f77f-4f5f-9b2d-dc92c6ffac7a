import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT || 3000;
  const environment = process.env.NODE_ENV || 'development';
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  app.setGlobalPrefix('api');
  
  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API para gestión de órdenes con persistencia en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  await app.listen(port);
  logger.log(`Aplicación iniciada en modo ${environment}`);
  logger.log(`Servidor corriendo en http://localhost:${port}`);
  logger.log(`Documentación Swagger disponible en http://localhost:${port}/api/docs`);
}

bootstrap();