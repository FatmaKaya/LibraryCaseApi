import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { UserBook } from './../entity/UserBook';
export class UserController {
    private userRepository = getRepository(User);
    private userBookRepository = getRepository(UserBook);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let user = await this.userRepository.findOne(request.params.id)

        const userbooks = await this.userBookRepository.find({
            relations: ['user', 'book'],
            where: { user: { id: request.params.id } },
        });

        let present = []
        let past = []

        userbooks.map(x => {
            x.score === null ? present.push(x.book) : past.push({ ...x.book, score: x.score })
        })

        return {
            ...user,
            books: {
                past: past,
                present: present,
            }
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }
}