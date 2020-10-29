import { v4 } from 'uuid';
import ISoilsRepository from '@modules/Project/repositories/ISoilsRepository';
import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import ICreateSoilDTO from '@modules/Project/dtos/ICreateSoilDTO';

class FakeSoilsRepository implements ISoilsRepository {
  private soilsRepository: Soil[] = [];

  public async findByName(name: string): Promise<Soil | undefined> {
    const soil = this.soilsRepository.find(item => item.name === name);

    return soil;
  }

  public async findById(id: string): Promise<Soil | undefined> {
    const soil = this.soilsRepository.find(item => item.id === id);

    return soil;
  }

  public async create({
    name,
    text_class,
    total_depth,
    author_id,
  }: ICreateSoilDTO): Promise<Soil> {
    const newSoil = new Soil();

    Object.assign(newSoil, {
      id: v4(),
      name,
      text_class,
      total_depth,
      author_id,
    });

    this.soilsRepository.push(newSoil);

    return newSoil;
  }
}

export default FakeSoilsRepository;
