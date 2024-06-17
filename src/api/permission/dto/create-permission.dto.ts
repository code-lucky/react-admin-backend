import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty({ message: '角色ID不能为空' })
    roleId: number;

    @IsNotEmpty({ message: '菜单ID不能为空' })
    menuId: number;
}
