import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { StorageService } from '../storage/storage.service';
import { randomUUID } from 'node:crypto';

export interface Car {
  id: string;
  model: string;
  year: number;
  manufacturerId: string;
}

const STORAGE_KEY = 'cars.json';

@Injectable()
export class CarService {
  constructor(private readonly storage: StorageService) {}

  async create(dto: CreateCarDto): Promise<Car> {
    const cars = await this.storage.read<Car>(STORAGE_KEY);
    const car: Car = {
      id: randomUUID(),
      model: dto.model,
      year: dto.year,
      manufacturerId: dto.manufacturerId,
    };
    cars.push(car);
    await this.storage.write(STORAGE_KEY, cars);
    return car;
  }

  async findAll(): Promise<Car[]> {
    return this.storage.read<Car>(STORAGE_KEY);
  }

  async findOne(id: string): Promise<Car> {
    const cars = await this.storage.read<Car>(STORAGE_KEY);
    const car = cars.find((c) => c.id === id);
    if (!car) {
      throw new NotFoundException(`Car ${id} not found`);
    }
    return car;
  }

  async update(id: string, dto: UpdateCarDto): Promise<Car> {
    const cars = await this.storage.read<Car>(STORAGE_KEY);
    const car = cars.find((c) => c.id === id);
    if (!car) {
      throw new NotFoundException(`Car ${id} not found`);
    }

    if (dto.model !== undefined) car.model = dto.model;
    if (dto.year !== undefined) car.year = dto.year;
    if (dto.manufacturerId !== undefined)
      car.manufacturerId = dto.manufacturerId;

    await this.storage.write(STORAGE_KEY, cars);
    return car;
  }

  async remove(id: string): Promise<void> {
    const cars = await this.storage.read<Car>(STORAGE_KEY);
    const idx = cars.findIndex((c) => c.id === id);
    if (idx === -1) {
      throw new NotFoundException(`Car ${id} not found`);
    }
    cars.splice(idx, 1);
    await this.storage.write(STORAGE_KEY, cars);
  }
}
