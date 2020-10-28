import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';

import User from '@modules/User/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  username: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    username,
    email,
    password,
  }: RequestDTO): Promise<User> {
    const existingUsername = await this.usersRepository.findByName(username);

    if (existingUsername) {
      throw new AppError('Username already exists.', 400);
    }

    const existingEmail = await this.usersRepository.findByEmail(email);

    if (existingEmail) {
      throw new AppError('Email already exists.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
