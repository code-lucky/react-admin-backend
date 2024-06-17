import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @IsNotEmpty({ message: 'ID不能为空' })
    id: number;
}
