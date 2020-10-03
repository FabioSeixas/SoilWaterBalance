import { getRepository } from 'typeorm';
import AppError from '../erros/AppError';
import Soil from '../models/Soil';

interface RequestDTO {
  id: string;
  name: string;
  text_class: string;
  total_depth: number;
}

class CreateSoilService {
  public async execute({
    id,
    name,
    text_class,
    total_depth,
  }: RequestDTO): Promise<Soil> {
    const soilsRepo = getRepository(Soil);

    const alreadyExistsName = await soilsRepo.findOne({ where: { name } });

    if (alreadyExistsName) {
      throw new AppError('Soil Name already exists.', 400);
    }

    if (total_depth > 500) {
      throw new AppError(
        'Soil total depth should be equal or lower than 500 cm.',
        400,
      );
    }

    const newSoil = soilsRepo.create({
      author_id: id,
      name,
      text_class,
      total_depth,
    });

    await soilsRepo.save(newSoil);

    return newSoil;
  }
}

export default CreateSoilService;
