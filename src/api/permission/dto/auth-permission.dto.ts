import { IsNotEmpty } from "class-validator";

export class AuthPermissionDto {
    @IsNotEmpty({ message: '角色ID不能为空' })
    roleId: number;

    @IsNotEmpty({ message: '菜单ID不能为空' })
    menuList: number[];
}