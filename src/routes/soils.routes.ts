import { Router } from 'express';
import { getRepository } from 'typeorm';

import Soil from '../models/Soil';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';

const soilsRouter = Router();

soilsRouter.use(ensureAnthenticated);

soilsRouter.get('/', async (request, response) => {
  const soilsRepo = getRepository(Soil);

  const soils = await soilsRepo.find();

  response.json(soils);
});

export default soilsRouter;
