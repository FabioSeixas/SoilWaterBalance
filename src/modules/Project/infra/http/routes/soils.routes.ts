import { Router } from 'express';

import ensureAnthenticated from '@modules/User/infra/http/middlewares/ensureAnthenticated';

import SoilsController from '@modules/Project/infra/http/controllers/SoilsController';
import SoilsDataController from '@modules/Project/infra/http/controllers/SoilsDataController';

const soilsRouter = Router();

const soilsController = new SoilsController();
const soilsDataController = new SoilsDataController();

soilsRouter.use(ensureAnthenticated);

soilsRouter.get('/', soilsController.show);

soilsRouter.post('/', soilsController.create);

soilsRouter.post('/:soil_id', soilsDataController.create);

export default soilsRouter;
