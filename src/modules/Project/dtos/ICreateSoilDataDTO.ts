import Soil from '@modules/Project/infra/typeorm/entities/Soil';

export default interface ICreateSoilDataDTO {
  soil_id: string;
  saturation: number;
  wilt_point: number;
  start_depth: number;
  end_depth: number;
  field_cap: number;
  soil: Soil;
}
