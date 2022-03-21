import { getRepository, getConnection, IsNull, Not } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { UserBook } from './../entity/UserBook';
import { User } from './../entity/User';
import { Book } from './../entity/Book';
export class UserBookController {
    private userBookRepository = getRepository(UserBook);
    private userRepository = getRepository(User);
    private bookRepository = getRepository(Book);

    async borrow(request: Request, response: Response, next: NextFunction) {
        let user = await this.userRepository.findOne(request.params.userId);
        const book = await this.bookRepository.findOne(request.params.bookId);
        if (user && book) {
            let userBooks = await getRepository(UserBook)
                .createQueryBuilder('userBook')
                .where("bookId = :bookId", { bookId: request.params.bookId })
                .andWhere("userBook.score IS NULL")
                .getMany();

            if (userBooks.length > 0)
                response.status(404).send({ status: false, error: 'This book has been borrowed by someone else.' });
            else {
                const userBook = new UserBook();
                userBook.user = user;
                userBook.book = book;
                await this.userBookRepository.save(userBook).then((ub) => {
                    response.status(200).send({ status: true });
                }).catch((error) => {
                    next(error);
                });
            }
        }
        else
            response.status(404).send({ status: false, error: 'Book or User not found' });
    }

    async return(request: Request, response: Response, next: NextFunction) {
        await getConnection()
            .createQueryBuilder()
            .update(UserBook)
            .set({ score: request.body.score })
            .where("userId = :userId", { userId: request.params.userId })
            .andWhere("bookId = :bookId", { bookId: request.params.bookId })
            .execute()
            .then((result) => {
                if (result.affected > 0)
                    response.status(200).send({ status: true });
                else
                    response.status(404).send({ status: false, error: 'This book is not taken by this user' });

            })
            .catch((error) => {
                next(error);
            });
    }
}