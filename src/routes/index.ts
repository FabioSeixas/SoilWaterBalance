import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.route';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
