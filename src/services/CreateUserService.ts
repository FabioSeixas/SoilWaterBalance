import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errros/AppError';

interface RequestDTO {
  username: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    username,
    email,
    password,
  }: RequestDTO): Promise<User> {
    const usersRepo = getRepository(User);

    const existingUsername = await usersRepo.findOne({ where: { username } });

    if (existingUsername) {
      throw new AppError('Username already exists.');
    }

    const existingEmail = await usersRepo.findOne({ where: { email } });

    if (existingEmail) {
      throw new AppError('Email already exists.');
    }

    const newUser = usersRepo.create({
      username,
      email,
      password,
    });

    await usersRepo.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
