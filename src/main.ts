import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  // Adiciona o prefixo global '/api'
  app.setGlobalPrefix('api');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Jornada Milhas API')
    .setDescription('API de promoções e depoimentos')
    .setVersion('1.0')
    // .addBearerAuth() // descomente se usar autenticação com Bearer token
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Configura a rota do Swagger, dentro do prefixo '/api'
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
