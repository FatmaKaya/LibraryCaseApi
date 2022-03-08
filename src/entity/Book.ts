import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { UserBook } from './UserBook';
@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    
    @OneToMany(type => UserBook, userBook => userBook.book)
    userBook: UserBook[];
}
