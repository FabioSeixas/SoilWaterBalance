import ISoilsDataRepository from '@modules/Project/repositories/ISoilsDataRepository';
import { getRepository, Repository } from 'typeorm';
import SoilData from '@modules/Project/infra/typeorm/entities/SoilData';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';

class SoilsDataRepository implements ISoilsDataRepository {
  private ormRepository: Repository<SoilData>;

  constructor() {
    this.ormRepository = getRepository(SoilData);
  }

  public async findBySoilId(soil_id: string): Promise<SoilData[] | undefined> {
    const soilData = await this.ormRepository.find({ where: { soil_id } });

    return soilData;
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
