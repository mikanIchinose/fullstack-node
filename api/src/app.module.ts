import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [CoreModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
