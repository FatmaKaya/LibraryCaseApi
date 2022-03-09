import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { UserBook } from './../entity/UserBook';
export class UserController {
    private userRepository = getRepository(User);
    private userBookRepository = getRepository(UserBook);

    async all(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.find().then((users)=>{
            response.status(200).send(users);
        }).catch((error)=>{
            next(error);
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.findOne(request.params.id).then(async (user) => {
            if (user) {
                const userbooks = await this.userBookRepository.find({
                    relations: ['user', 'book'],
                    where: { user: { id: request.params.id } },
                });

                let present = []
                let past = []

                userbooks.map(ub => {
                    ub.score === null ? present.push(ub.book) : past.push({ ...ub.book, score: ub.score })
                })

                response.status(200).send({
                    ...user,
                    books: {
                        past: past,
                        present: present,
                    }
                });
            }
            else
                response.status(404).send({ error: 'User not found' });

        }).catch((error) => {
            next(error);
        });

    }

    async save(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.save(request.body).then((users)=>{
            response.status(200).send(users);
        }).catch((error)=>{
            next(error);
        });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }
}