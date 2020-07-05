import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 128,
    })
    email: string;

    @Column({
        length: 128,
    })
    password: string;

    @Column({
        length: 64,
    })
    userName: string;

    @Column({
        type: 'boolean'
    })
    active: boolean;

    @Column({
        type: 'datetime'
    })
    lastLogin: Date;

    @Column({
        type: 'text'
    })
    about?: string;

    @Column({
        type: 'int'
    })
    age?: number;

    @Column({
        length: 64,
    })
    firstName?: string;

    @Column({
        length: 64,
    })
    lastName?: string;

}
