import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post() create(@Body() dto: CreateCarDto) {
    return this.carService.create(dto);
  }
  @Get() findAll() {
    return this.carService.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return this.carService.update(id, dto);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    this.carService.remove(id);
    return { deleted: true };
  }
}
