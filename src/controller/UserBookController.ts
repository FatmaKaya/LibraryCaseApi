import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { UserBook } from './../entity/UserBook';
import { User } from './../entity/User';
import { Book } from './../entity/Book';

export class UserBookController {

    private userBookRepository = getRepository(UserBook);
    private userRepository = getRepository(User);
    private bookRepository = getRepository(Book);


    async return(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne(request.params.userId);
        const book = await this.bookRepository.findOne(request.params.bookId);

        const userBook = new UserBook();
        userBook.score = request.body.score;
        userBook.user=user;
        userBook.book= book;
        
        return this.userBookRepository.save(userBook);
    }

}