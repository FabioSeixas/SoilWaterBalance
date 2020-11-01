import ISoilsDataRepository from '@modules/Project/repositories/ISoilsDataRepository';
import SoilData from '@modules/Project/infra/typeorm/entities/SoilData';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';
import { v4 } from 'uuid';

class SoilsDataRepository implements ISoilsDataRepository {
  private repository: SoilData[][] = [];

  public async findBySoilId(id: string): Promise<SoilData[] | undefined> {
    const soilDataArray = this.repository.filter(item =>
      item.find(soilLayer => soilLayer.soil_id === id),
    );

    const [soilData] = soilDataArray;

    return soilData;
  }

  public async create(data: ICreateSoilDataDTO[]): Promise<SoilData[]> {
    const newSoilArray = data.map(
      (soilLayer: ICreateSoilDataDTO): SoilData => {
        const newSoil = new SoilData();
        Object.assign(newSoil, soilLayer, { id: v4() });
        return newSoil;
      },
    );

    this.repository.push(newSoilArray);

    return newSoilArray;
  }
}

export default SoilsDataRepository;
