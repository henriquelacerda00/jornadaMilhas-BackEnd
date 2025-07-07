import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Servir arquivos estáticos da pasta 'public'
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://alura-jornada-milhas.vercel.app',
    ],
  });

  // Aqui adiciona o prefixo global
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
