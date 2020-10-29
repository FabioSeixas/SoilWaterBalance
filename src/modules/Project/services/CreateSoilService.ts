import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import ISoilsRepository from '@modules/Project/repositories/ISoilsRepository';

import ICreateSoilDTO from '@modules/Project/dtos/ICreateSoilDTO';

@injectable()
class CreateSoilService {
  constructor(
    @inject('SoilsRepository')
    private soilsRepository: ISoilsRepository,
  ) {}

  public async execute({
    author_id,
    name,
    text_class,
    total_depth,
  }: ICreateSoilDTO): Promise<Soil> {
    const alreadyExistsName = await this.soilsRepository.findByName(name);

    if (alreadyExistsName) {
      throw new AppError('Soil Name already exists.', 400);
    }

    if (total_depth > 500) {
      throw new AppError(
        'Soil total depth should be equal or lower than 500 cm.',
        400,
      );
    }

    const newSoil = this.soilsRepository.create({
      author_id,
      name,
      text_class,
      total_depth,
    });

    return newSoil;
  }
}

export default CreateSoilService;
