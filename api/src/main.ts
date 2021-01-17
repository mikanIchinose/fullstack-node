import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { global_logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(global_logger);
  await app.listen(3000);
}
bootstrap();
