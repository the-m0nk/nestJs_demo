import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto, getDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schema/item.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiValidationPipe } from 'src/utils/validation.pipes';


@UseGuards(AuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.itemsService.remove(id);
  }
}
