import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.route';
import soilsRouter from './soils.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/soils', soilsRouter);

export default routes;
