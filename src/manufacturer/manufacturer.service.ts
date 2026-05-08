// manufacturer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { randomUUID } from 'node:crypto';

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
}

@Injectable()
export class ManufacturerService {
  private manufacturers: Manufacturer[] = [];

  create(dto: CreateManufacturerDto): Manufacturer {
    const manufacturer: Manufacturer = {
      id: randomUUID(),
      name: dto.name,
      country: dto.country,
    };
    this.manufacturers.push(manufacturer);

    return manufacturer;
  }

  findAll(): Manufacturer[] {
    return this.manufacturers;
  }

  findOne(id: string): Manufacturer {
    const m = this.manufacturers.find((x) => x.id === id);
    if (!m) throw new NotFoundException(`Manufacturer ${id} not found`);
    return m;
  }

  remove(id: string): void {
    const i = this.manufacturers.findIndex((x) => x.id === id);
    if (i === -1) throw new NotFoundException();
    this.manufacturers.splice(i, 1);
  }
}
