import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', // Allow from .env or default to all origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out unwanted properties
      forbidNonWhitelisted: false, // Rejects requests with unknown properties
      transform: true, // Auto-transform payloads to DTO classes
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
