import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { Menu } from "./menu.entity";

@Entity('sys_permission')
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, role => role.permissions)
    role: Role;

    @ManyToOne(() => Menu, menu => menu.permissions)
    menu: Menu;

    @Column({
        type: 'int',
        comment: '角色ID'
    })
    roleId: number;

    @Column({
        type: 'int',
        comment: '菜单ID'
    })
    menuId: number;

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
