import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entitys/auth.entity';
import { md5 } from 'src/utils/md5';
import { LoginDto } from './dto/login.dto';
import { Role } from '../entitys/role.entity';
import { Menu } from '../entitys/menu.entity';
import { Permission } from '../entitys/permission.entity';
import { toTree } from 'src/utils/tree';

@Injectable()
export class AuthService {

  @InjectRepository(Auth)
  private authRepository: Repository<Auth>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Menu)
  private menuRepository: Repository<Menu>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  /**
   * User register
   * @param createAuthDto 
   */
  async register(createAuthDto: CreateAuthDto) {
    // if user already exists
    const user = await this.authRepository.findOne(
      {
        where: {
          username: createAuthDto.username
        }
      }
    );
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // create user
    const newUser = new Auth();
    newUser.username = createAuthDto.username;
    // md5 encryption
    newUser.password = md5(createAuthDto.password);
    newUser.email = createAuthDto.email;
    await this.authRepository.save(newUser);

    return 'User created successfully';
  }


  async login(user: LoginDto) {
    const findUser = await this.authRepository.findOne(
      {
        where: {
          username: user.username,
        }
      }
    );

    // if user does not exist
    if (!findUser) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    // verify password
    if (findUser.password !== md5(user.password)) {
      throw new HttpException('Password error', HttpStatus.BAD_REQUEST);
    }

    // 获取role
    const role = await this.roleRepository.findOne(
      {
        where: {
          id: findUser.roleId
        }
      }
    );

    // 通过关联查询获取role下的menu,permission是中间表，里面有roleid和menuid
    const permission = await this.permissionRepository.find(
      {
        where: {
          roleId: findUser.roleId
        }
      }
    );

    // 获取menu
    const menuIds = permission.map(item => item.menuId);
    const menus = await this.menuRepository.findByIds(menuIds);
    
    const treeData = toTree(menus);

    const data = {
      user: {
        username: findUser.username,
        email: findUser.email,
        id: findUser.id,
        avatar: findUser.avatar,
        created_at: findUser.created_at,
        updated_at: findUser.updated_at,
        roleId: findUser.roleId,
        permissions: treeData,
        role: {
          ...role,
          permission: treeData
        }
      }
    }
    return data;
  }
}
