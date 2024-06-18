import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('sys_auth')
export class Auth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        comment: '用户名'
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '密码'
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        unique: true,
        comment: '邮箱'
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '用户头像'
    })
    avatar: string;

    @Column({
        type: 'int',
        comment: '是否删除',
        default: 0,
    })
    delete: number;

    @Column({
        type: 'int',
        comment: '用户状态',
        default: 0,
    })
    status: number;

    @ManyToOne(() => Role, role => role.auths)
    role: Role;

    @Column({
        type: 'int',
        comment: '角色ID'
    })
    roleId: number;

    @CreateDateColumn({
        type: 'datetime',
        comment: '创建时间'
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间'
    })
    updated_at: Date;
}
