import { NestFactory } from '@nestjs/core';
import { CarModule } from '../car/car.module';
import { CarService } from '../car/car.service';
import { randomUUID } from 'node:crypto';

(async () => {
  const app = await NestFactory.createApplicationContext(CarModule);
  const carService = app.get(CarService);

  const car = await carService.create({
    manufacturerId: randomUUID(),
    model: 'Test',
    year: 2025,
  });

  const myCar = await carService.findOne(car.id);

  console.log(myCar);
})();
