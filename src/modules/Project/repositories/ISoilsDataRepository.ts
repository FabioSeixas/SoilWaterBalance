import SoilData from '@modules/Project/infra/typeorm/entities/SoilData';
import ICreateSoilDataDTO from '../dtos/ICreateSoilDataDTO';

export default interface ISoilsDataRepository {
  findById(id: string): Promise<SoilData[] | undefined>;
  create(data: ICreateSoilDataDTO[]): Promise<SoilData[]>;
}
