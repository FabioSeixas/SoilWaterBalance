import { Router } from 'express';

import usersRouter from '@modules/User/infra/http/routes/users.routes';
import sessionRouter from '@modules/User/infra/http/routes/session.routes';
import soilsRouter from '@modules/Project/infra/http/routes/soils.routes';
import passwordRouter from '@modules/User/infra/http/routes/password.routes';
import profileRouter from '@modules/User/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/soils', soilsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
