import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from '../entitys/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entitys/role.entity';
import { Menu } from '../entitys/menu.entity';
import { Permission } from '../entitys/permission.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Auth, Role, Menu, Permission])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
