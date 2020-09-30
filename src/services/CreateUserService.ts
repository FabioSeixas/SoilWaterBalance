import { getRepository } from 'typeorm';

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
  }
}
