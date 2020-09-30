import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { username, email, password } = request.body;

  const newUserService = new CreateUserService();

  const newUser = await newUserService.execute({
    username,
    email,
    password,
  });

  return response.json(newUser);
});

export default usersRouter;
