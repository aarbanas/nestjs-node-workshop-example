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

  @Post() async create(@Body() dto: CreateCarDto) {
    return this.carService.create(dto);
  }
  @Get() async findAll() {
    return this.carService.findAll();
  }
  @Get(':id') async findOne(@Param('id') id: string) {
    return this.carService.findOne(id);
  }
  @Patch(':id') async update(
    @Param('id') id: string,
    @Body() dto: UpdateCarDto,
  ) {
    return this.carService.update(id, dto);
  }
  @Delete(':id') async remove(@Param('id') id: string) {
    await this.carService.remove(id);
    return { deleted: true };
  }
}
