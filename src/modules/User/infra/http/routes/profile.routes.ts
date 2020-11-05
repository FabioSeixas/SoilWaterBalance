import { Router } from 'express';

import ProfileController from '@modules/User/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/User/infra/http/middlewares/ensureAnthenticated';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profileRouter.get('/show', profileController.show);
profileRouter.put('/update', profileController.update);

export default profileRouter;
