import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from '../entitys/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  /**
   * 创建role
   * @param createRoleDto 
   * @returns 
   */
  async create(createRoleDto: CreateRoleDto) {
    this.roleRepository.create(createRoleDto);
    return 'created successly'
  }


  /**
   * 查询role列表
   * @returns
   */
  async findAll() {
    const list = await this.roleRepository.find({where:{delete: 0}});

    return list;
  }

  /**
   * 查询role详情
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    const role = await this.roleRepository.findOne({where:{id, delete: 0}});

    return role;
  }
  
  /**
   * 更新role
   * @param roleDto 
   * @returns 
   */
  async update(roleDto: UpdateRoleDto) {
    const role = await this.roleRepository.update(roleDto.id, roleDto);

    return 'Update success'
  }

  /**
   * 删除role
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    const role = await this.roleRepository.update(id, {delete: 1});

    return 'Delete success'
  }
}
