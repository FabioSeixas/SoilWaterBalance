import { Router } from 'express';
import { getRepository } from 'typeorm';

import Soil from '../models/Soil';
import ensureAnthenticated from '../middlewares/ensureAnthenticated';
import CreateSoilService from '../services/CreateSoilService';
import CreateSoilDataService from '../services/CreateSoilDataService';

interface SoilDataDTO {
  soil_id: string;
  start_depth: number;
  end_depth: number;
  field_cap: number;
  wilt_point: number;
  saturation: number;
}

const soilsRouter = Router();

soilsRouter.use(ensureAnthenticated);

soilsRouter.get('/', async (request, response) => {
  const soilsRepo = getRepository(Soil);

  const soils = await soilsRepo.find();

  response.json(soils);
});

soilsRouter.post('/', async (request, response) => {
  const { id } = request.user;
  const { name, text_class, total_depth } = request.body;

  const createSoil = new CreateSoilService();

  const newSoil = await createSoil.execute({
    id,
    name,
    text_class,
    total_depth,
  });

  return response.json(newSoil);
});

soilsRouter.post('/:soil_id', async (request, response) => {
  const { soil_id } = request.params;
  const reqBody = request.body;

  const soilDataArray: SoilDataDTO[] = reqBody.map(
    (dataByDepth: SoilDataDTO) => {
      dataByDepth.soil_id = soil_id;
      return dataByDepth;
    },
  );

  const createSoilData = new CreateSoilDataService();

  const newSoilData = await createSoilData.execute(soilDataArray);

  return response.json(newSoilData);
});

export default soilsRouter;
