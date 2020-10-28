import ISoilsRepository from '@modules/Project/repositories/ISoilsRepository';
import { getRepository, Repository } from 'typeorm';
import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import ICreateSoilDTO from '@modules/Project/dtos/ICreateSoilDTO';

class SoilsRepository implements ISoilsRepository {
  private ormRepository: Repository<Soil>;

  constructor() {
    this.ormRepository = getRepository(Soil);
  }

  public async findByName(name: string): Promise<Soil | undefined> {
    const user = await this.ormRepository.findOne({ where: { name } });

    return user;
  }

  public async findById(id: string): Promise<Soil | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async create({
    name,
    text_class,
    total_depth,
    author_id,
  }: ICreateSoilDTO): Promise<Soil> {
    const newSoil = this.ormRepository.create({
      name,
      text_class,
      total_depth,
      author_id,
    });

    await this.ormRepository.save(newSoil);

    return newSoil;
  }
}

export default SoilsRepository;
