import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/User/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body;

  const newUserService = container.resolve(CreateUserService);

  const newUser = await newUserService.execute({
    username,
    email,
    password,
  });

  delete newUser.password;

  return response.json(newUser);
});

export default usersRouter;
