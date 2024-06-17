import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Auth } from "./auth.entity";

@Entity('sys_role')
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        comment: '角色名称'
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '角色标识'
    })
    label: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '角色描述'
    })
    description: string;

    @Column({
        type: 'int',
        comment: '角色状态',
        default: 0,
    })
    status: number;

    @Column({
        type: 'int',
        comment: '是否删除',
        default: 0,
    })
    delete: number;

    @Column({
        type: 'int',
        comment: '排序',
        default: 0,
    })
    sort: number;

    @OneToMany(() => Permission, permission => permission.role)
    permissions: Permission[];

    @OneToMany(() => Auth, auth => auth.role)
    auths: Auth[];

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
