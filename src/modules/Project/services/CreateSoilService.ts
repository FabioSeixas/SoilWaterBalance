import AppError from '@shared/errors/AppError';
import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import SoilsRepository from '@modules/Project/infra/typeorm/repositories/SoilsRepository';

import ICreateSoilDTO from '@modules/Project/dtos/ICreateSoilDTO';

class CreateSoilService {
  constructor(private soilsRepository: SoilsRepository) {}

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
