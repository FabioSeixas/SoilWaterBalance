import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';

import User from '@modules/User/infra/typeorm/entities/User';

import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';

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
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
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

    const hashedPassword = await this.hashProvider.createHash(password);

    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

export default CreateUserService;
