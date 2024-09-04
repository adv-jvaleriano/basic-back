import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { MaintenanceMiddleware } from './middlewares/maintenance.middleware';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders: '*',
  });

  // Global middleware
  app.use(new MaintenanceMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.BACKEND_PORT ?? PORT);
}
bootstrap();
