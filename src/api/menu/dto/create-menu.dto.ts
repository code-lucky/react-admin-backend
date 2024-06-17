import { IsNotEmpty } from "class-validator";

export class CreateMenuDto {

    @IsNotEmpty({ message: '父级ID不能为空' })
    pid: number;

    @IsNotEmpty({ message: '菜单名称不能为空' })
    name: string;

    label: string;

    @IsNotEmpty({ message: '菜单路径不能为空' })
    route: string;

    @IsNotEmpty({ message: '组件路径不能为空' })
    component: string;

    @IsNotEmpty({ message: '菜单类型不能为空' })
    type: number;

    icon: string;

    sort: number;
}
