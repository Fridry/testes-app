import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('Product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBearerAuth()
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity(
      await this.productsService.create(createProductDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: [ProductEntity] })
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map((product) => new ProductEntity(product));
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ProductEntity] })
  @ApiBearerAuth()
  async findDrafts() {
    const drafts = await this.productsService.findDrafts();
    return drafts.map((product) => new ProductEntity(product));
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return new ProductEntity(
      await this.productsService.update(id, updateProductDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.remove(id));
  }
}
