// main.ts de tu API de NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    // Permite peticiones solo desde tu frontend.
    // En producción, es recomendable ser más específico.
    origin: 'http://localhost:4200',
    // Permite todos los métodos, incluyendo OPTIONS
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
