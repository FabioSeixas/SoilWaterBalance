import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
  const { username, email, password } = request.body;

  return response.json({ message: 'ok' });
});

export default usersRouter;
