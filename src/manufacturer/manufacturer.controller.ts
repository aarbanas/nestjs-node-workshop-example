// manufacturer.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private readonly service: ManufacturerService) {}
  @Post() create(@Body() dto: CreateManufacturerDto) {
    return this.service.create(dto);
  }
  @Get() findAll() {
    return this.service.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    this.service.remove(id);
    return { deleted: true };
  }
}
