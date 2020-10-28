import { Router } from 'express';

import usersRouter from '@modules/User/infra/http/routes/users.routes';
import sessionRouter from '@modules/User/infra/http/routes/session.route';
import soilsRouter from '@modules/Project/infra/http/routes/soils.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/soils', soilsRouter);

export default routes;
