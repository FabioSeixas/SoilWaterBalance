import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/User/services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authService = container.resolve(AuthenticateUserService);

  const { user, token } = await authService.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
