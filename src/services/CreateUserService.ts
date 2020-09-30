import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import AppError from '../erros/AppError';

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
      throw new AppError('Username already exists.', 400);
    }

    const existingEmail = await usersRepo.findOne({ where: { email } });

    if (existingEmail) {
      throw new AppError('Email already exists.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepo.create({
      username,
      email,
      password: hashedPassword,
    });

    await usersRepo.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
