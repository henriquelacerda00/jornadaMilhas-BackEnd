import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Servir arquivos estáticos da pasta 'public'
  // Exemplo: https://jornadamilhas-backend.onrender.com/public/veneza.png
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // ✅ Habilitar CORS para permitir requisições do front-end (local + Vercel)
  app.enableCors({
    origin: [
      'http://localhost:4200', // Front local (dev)
      'https://alura-jornada-milhas.vercel.app', // Front produção (Vercel)
    ],
  });

  // ✅ Iniciar o servidor na porta definida ou na 8080 por padrão
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
