import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';

@Module({
  imports: [CarModule, ManufacturerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
