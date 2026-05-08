import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { randomUUID } from 'node:crypto';

export interface Car {
  id: string;
  model: string;
  year: number;
  manufacturerId: string;
}

@Injectable()
export class CarService {
  private cars: Car[] = [];

  create(dto: CreateCarDto): Car {
    const car: Car = {
      id: randomUUID(),
      model: dto.model,
      year: dto.year,
      manufacturerId: dto.manufacturerId,
    };
    this.cars.push(car);
    return car;
  }

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string): Car {
    const car = this.cars.find((c) => c.id === id);
    if (!car) {
      throw new NotFoundException(`Car ${id} not found`);
    }

    return car;
  }

  update(id: string, dto: UpdateCarDto): Car {
    const car = this.findOne(id);

    if (dto.model !== undefined) {
      car.model = dto.model;
    }

    if (dto.year !== undefined) {
      car.year = dto.year;
    }

    if (dto.manufacturerId !== undefined) {
      car.manufacturerId = dto.manufacturerId;
    }

    return car;
  }

  remove(id: string): void {
    const idx = this.cars.findIndex((c) => c.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Car ${id} not found`);
    }

    this.cars.splice(idx, 1);
  }
}
