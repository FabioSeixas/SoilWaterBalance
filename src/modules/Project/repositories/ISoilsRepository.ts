import Soil from '@modules/Project/infra/typeorm/entities/Soil';
import ICreateSoilDTO from '../dtos/ICreateSoilDTO';

export default interface ISoilsRepository {
  findByName(username: string): Promise<Soil | undefined>;
  findById(id: string): Promise<Soil | undefined>;
  create(data: ICreateSoilDTO): Promise<Soil>;
}
