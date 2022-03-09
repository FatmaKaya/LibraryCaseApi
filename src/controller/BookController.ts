import { getRepository, IsNull, Not } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Book } from "../entity/Book";
import { UserBook } from './../entity/UserBook';
export class BookController {
    private bookRepository = getRepository(Book);
    private userBookRepository = getRepository(UserBook);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.find().then((books) => {
            response.status(200).send(books);
        }).catch((error) => {
            next(error);
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        await this.bookRepository.findOne(request.params.id).then(async (book) => {
            if (book) {
                const userbooks = await this.userBookRepository.find({
                    relations: ['user', 'book'],
                    where: { book: { id: request.params.id }, score: Not(IsNull()) },
                });

                let sum = 0;
                userbooks.map(ub => {
                    sum = sum + ub.score
                })
                let avg = sum / userbooks.length

                response.status(200).send({ ...book, score: avg });
            }
            else
                response.status(404).send({ status: false, error: 'Book not found' });

        }).catch((error) => {
            next(error);
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.bookRepository.save(request.body).then((book) => {
            response.status(200).send(book);
        }).catch((error) => {
            next(error);
        });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let bookToRemove = await this.bookRepository.findOne(request.params.id);
        await this.bookRepository.remove(bookToRemove);
    }
}