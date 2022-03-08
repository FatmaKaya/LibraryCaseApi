import { getRepository, IsNull, Not } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Book } from "../entity/Book";
import { UserBook } from './../entity/UserBook';
export class BookController {
    private bookRepository = getRepository(Book);
    private userBookRepository = getRepository(UserBook);


    async all(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let book = await this.bookRepository.findOne(request.params.id);

        const userbooks = await this.userBookRepository.find({
            relations: ['user', 'book'],
            where: { book: { id: request.params.id }, score: Not(IsNull()) },
        });

        let sum = 0;
        userbooks.map(ub => {
            sum = sum + ub.score
        })
        let avg = sum / userbooks.length

        console.log(userbooks)
        return { ...book, score: avg }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let bookToRemove = await this.bookRepository.findOne(request.params.id);
        await this.bookRepository.remove(bookToRemove);
    }

}