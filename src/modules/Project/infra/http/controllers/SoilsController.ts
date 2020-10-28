import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { getRepository } from 'typeorm';

import Soil from '@modules/Project/infra/typeorm/entities/Soil';

import CreateSoilService from '@modules/Project/services/CreateSoilService';

export default class SoilsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: author_id } = request.user;
    const { name, text_class, total_depth } = request.body;

    const createSoil = container.resolve(CreateSoilService);

    const newSoil = await createSoil.execute({
      author_id,
      name,
      text_class,
      total_depth,
    });

    return response.json(newSoil);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const soilsRepo = getRepository(Soil);

    const soils = await soilsRepo.find();

    return response.json(soils);
  }
}
