import ISoilsDataRepository from '@modules/Project/repositories/ISoilsDataRepository';
import { getRepository, Repository } from 'typeorm';
import SoilData from '@modules/Project/infra/typeorm/entities/SoilData';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';

class SoilsDataRepository implements ISoilsDataRepository {
  private ormRepository: Repository<SoilData>;

  constructor() {
    this.ormRepository = getRepository(SoilData);
  }

  public async findByName(name: string): Promise<SoilData | undefined> {
    const user = await this.ormRepository.findOne({ where: { name } });

    return user;
  }

  public async create(data: ICreateSoilDataDTO[]): Promise<SoilData[]> {
    const newSoilDataArray = this.ormRepository.create(
      data.map((dataByDepth: ICreateSoilDataDTO) => dataByDepth),
    );

    await this.ormRepository.save(newSoilDataArray);

    return newSoilDataArray;
  }
}

export default SoilsDataRepository;
