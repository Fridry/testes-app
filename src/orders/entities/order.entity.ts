//src/products/entities/product.entity.ts
import { Order, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  product: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Prisma.Decimal;

  @ApiProperty()
  provider: string;

  @ApiProperty({ default: false })
  available: boolean;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
