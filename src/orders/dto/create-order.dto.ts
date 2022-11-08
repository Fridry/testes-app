import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  product: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false })
  description?: string;

  @Min(1.0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  provider: string;

  @ApiProperty({ required: false, default: true })
  available?: boolean = false;
}
