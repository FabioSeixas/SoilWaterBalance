import { Router } from 'express';

import CreateUserService from '@modules/User/services/CreateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body;

  const usersRepository = new UsersRepository();

  const newUserService = new CreateUserService(usersRepository);

  const newUser = await newUserService.execute({
    username,
    email,
    password,
  });

  delete newUser.password;

  return response.json(newUser);
});

export default usersRouter;
