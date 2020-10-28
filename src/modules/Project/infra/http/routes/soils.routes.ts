import { Router } from 'express';
import { getRepository } from 'typeorm';

import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import ensureAnthenticated from '@modules/User/infra/http/middlewares/ensureAnthenticated';
import CreateSoilService from '@modules/Project/services/CreateSoilService';
import CreateSoilDataService from '@modules/Project/services/CreateSoilDataService';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';
import SoilsRepository from '../../typeorm/repositories/SoilsRepository';
import SoilsDataRepository from '../../typeorm/repositories/SoilsDataRepository';

const soilsRouter = Router();

soilsRouter.use(ensureAnthenticated);

soilsRouter.get('/', async (request, response) => {
  const soilsRepo = getRepository(Soil);

  const soils = await soilsRepo.find();

  response.json(soils);
});

soilsRouter.post('/', async (request, response) => {
  const { id: author_id } = request.user;
  const { name, text_class, total_depth } = request.body;

  const soilsRepository = new SoilsRepository();

  const createSoil = new CreateSoilService(soilsRepository);

  const newSoil = await createSoil.execute({
    author_id,
    name,
    text_class,
    total_depth,
  });

  return response.json(newSoil);
});

soilsRouter.post('/:soil_id', async (request, response) => {
  const { soil_id } = request.params;
  const reqBody = request.body;

  const soilDataArray: ICreateSoilDataDTO[] = reqBody.map(
    (dataByDepth: ICreateSoilDataDTO) => {
      dataByDepth.soil_id = soil_id;
      return dataByDepth;
    },
  );

  const soilsRepository = new SoilsRepository();
  const soilsDataRepository = new SoilsDataRepository();

  const createSoilData = new CreateSoilDataService(
    soilsRepository,
    soilsDataRepository,
  );

  const newSoilData = await createSoilData.execute(soilDataArray);

  return response.json(newSoilData);
});

export default soilsRouter;
