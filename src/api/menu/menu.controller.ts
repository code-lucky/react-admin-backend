import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @Get('list')
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findOne(+id);
  }


  @Post('update')
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.update(updateMenuDto);
  }


  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.menuService.remove(+id);
  }
}
