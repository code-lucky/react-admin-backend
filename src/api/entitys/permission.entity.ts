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
        name: 'role_id',
        type: 'int',
        comment: '角色ID'
    })
    roleId: number;

    @Column({
        name: 'menu_id',
        type: 'int',
        comment: '菜单ID'
    })
    menuId: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        comment: '创建时间'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        comment: '更新时间'
    })
    updatedAt: Date;
}
