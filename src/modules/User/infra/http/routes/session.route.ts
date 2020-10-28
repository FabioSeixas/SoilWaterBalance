import { Router } from 'express';

import AuthenticateUserService from '@modules/User/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  const authService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authService.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
