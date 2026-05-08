import { IsString, IsInt, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsInt()
  @Min(1886)
  year: number; // first car: 1886

  @ApiProperty()
  @IsUUID()
  manufacturerId: string;
}
