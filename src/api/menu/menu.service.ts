import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../entitys/menu.entity';
import { toTree } from 'src/utils/tree';

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
    await this.menuRepository.save(menuDto);

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

    const menuList = toTree(list)

    return menuList;
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
  async update(menuDto: UpdateMenuDto) {

    const finMenu = await this.menuRepository.findOne({
      where:{
        id: menuDto.id,
      }
    })

    if (!finMenu) {
      throw new HttpException('Menu not found', HttpStatus.BAD_REQUEST);
    }

    await this.menuRepository.update(menuDto.id, menuDto);

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
