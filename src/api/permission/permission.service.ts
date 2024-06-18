import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthPermissionDto } from './dto/auth-permission.dto';
import { Repository } from 'typeorm';
import { Permission } from '../entitys/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Http } from 'winston/lib/winston/transports';

@Injectable()
export class PermissionService {

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  /**
   * role 鉴权
   * @param authDto 
   */
  async authRolePermission(authDto: AuthPermissionDto) {
    const { roleId, menuList } = authDto;
    const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
    queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.permissionRepository.delete({ roleId });

      const permissionList = menuList.map(menuId => {
        return { roleId, menuId };
      });

      await this.permissionRepository.insert(permissionList);

      await queryRunner.commitTransaction();

      return 'auth permission success';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
