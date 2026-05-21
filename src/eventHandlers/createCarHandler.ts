import { SQSEvent } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../main';
import { CarService } from '../car/car.service';
import { CreateCarDto } from '../car/dto/create-car.dto';

let app: INestApplication | undefined;

async function bootstrapEventHandler(): Promise<INestApplication> {
  if (!app) {
    app = await bootstrap();
    await app.init();
  }
  return app;
}

export const handler = async (event: SQSEvent): Promise<void> => {
  const app = await bootstrapEventHandler();
  const carService = await app.resolve(CarService);

  for (const record of event.Records) {
    const body = JSON.parse(record.body) as CreateCarDto;

    // TODO: Add logic for creating a vehicle
    const car = await carService.create(body);

    console.log(`Created car with id: ${car.id}`);
  }
};
