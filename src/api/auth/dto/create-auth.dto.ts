import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    @IsEmail({}, { message: '邮箱格式不正确' })
    email: string;
}
