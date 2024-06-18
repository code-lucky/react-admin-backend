import { Controller, Post, } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthPermissionDto } from './dto/auth-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  
  @Post('auth')
  async auth(authDto: AuthPermissionDto){
    return this.permissionService.authRolePermission(authDto);
  }
}
