import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entitys/menu.entity';
import { Http } from 'winston/lib/winston/transports';

@Injectable()
export class MenuService {

  @InjectRepository(Menu)
  private menuRepository: Repository<Menu>;

  /**
   * 创建菜单
   * @param menuDto 
   * @returns 
   */
  async create(menuDto: CreateMenuDto) {
    const menu = new Menu();
    menu.name = menuDto.name;
    menu.route = menuDto.route;
    menu.component = menuDto.component;
    menu.icon = menuDto.icon;
    menu.pid = menuDto.pid;
    menu.sort = menuDto.sort;
    menu.delete = 0;
    await this.menuRepository.save(menu);

    return 'Create successfully'
  }

  /**
   * 获取菜单列表
   * @returns 
   */
  async findAll() {
    const list = await this.menuRepository.find({
      where: {
        delete: 0
      }
    });
    return list;
  }


  /**
   * 根据ID获取菜单
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where:{
        id: id,
        delete: 0
      }
    });
    return menu;
  }


  /**
   * 更新菜单
   * @param updateMenuDto 
   * @returns 
   */
  async update(updateMenuDto: UpdateMenuDto) {

    const finMenu = await this.menuRepository.findOne({
      where:{
        id: updateMenuDto.id,
      }
    })

    if (!finMenu) {
      throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST);
    }

    const menu = new Menu();

    menu.id = updateMenuDto.id;
    menu.name = updateMenuDto.name;
    menu.route = updateMenuDto.route;
    menu.component = updateMenuDto.component;
    menu.icon = updateMenuDto.icon;
    menu.pid = updateMenuDto.pid;
    menu.sort = updateMenuDto.sort;

    await this.menuRepository.save(menu);

    return 'Update successfully'
  }

  /**
   * 删除菜单
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    await this.menuRepository.update(id, {
      delete: 1
    })

    return 'Remove successfully'
  }
}
