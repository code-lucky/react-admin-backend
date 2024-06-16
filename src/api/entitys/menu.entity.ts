import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity('sys_menu')
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        comment: '父级ID',
        default: 0,
    })
    pid: number;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '菜单名称'
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '菜单标识',
        nullable: true,
    })
    label: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        comment: '菜单路径',
    })
    route: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '组件路径',
    })
    component: string;

    @Column({
        type: 'int',
        comment: '菜单类型',
        default: 0,
    })
    type: number;

    @Column({
        type: 'varchar',
        comment: 'icon图标',
        nullable: true,
    })
    icon: string;

    @Column({
        type: 'int',
        comment: '排序',
        default: 0,
    })
    sort: number;

    @Column({
        type: 'int',
        comment: '是否删除',
        default: 0,
    })
    delete: number;

    @OneToMany(() => Permission, permission => permission.menu)
    permissions: Permission[];

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
