import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { UserBook } from './UserBook';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => UserBook, userBook => userBook.user)
    userBook: UserBook[];
}
