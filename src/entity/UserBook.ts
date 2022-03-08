import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Book } from './Book';
import { User } from './User';

@Entity()
export class UserBook {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    score: number;

    @ManyToOne(type => User, user => user.userBook, { primary: true })
    user: User;

    @ManyToOne(type => Book, book => book.userBook, { primary: true })
    book: Book;
}
