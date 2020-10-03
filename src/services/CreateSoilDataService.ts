import { getRepository } from 'typeorm';
import AppError from '../erros/AppError';
import SoilData from '../models/SoilData';
import Soil from '../models/Soil';

interface SoilDataDTO {
  soil_id: string;
  start_depth: number;
  end_depth: number;
  field_cap: number;
  wilt_point: number;
  saturation: number;
}

class CreateSoilDataService {
  public async execute(soilDataArray: SoilDataDTO[]): Promise<SoilDataDTO[]> {
    const soilDataRepo = getRepository(SoilData);
    const soilRepo = getRepository(Soil);

    const soil = await soilRepo.findOne({
      where: { id: soilDataArray[0].soil_id },
    });

    if (!soil) {
      throw new AppError('Soil Id not found.', 400);
    }

    const readySoilDataArray: SoilData[] = soilDataArray.map(dataByDepth => {
      dataByDepth.soil = soil;
      return dataByDepth as SoilData;
    });
    const createdSoilDataArray = soilDataRepo.create(
      readySoilDataArray.map((dataByDepth: SoilData) => ({
        soil_id: dataByDepth.soil_id,
        saturation: dataByDepth.saturation,
        wilt_point: dataByDepth.wilt_point,
        start_depth: dataByDepth.start_depth,
        end_depth: dataByDepth.end_depth,
        field_cap: dataByDepth.field_cap,
        soil: dataByDepth.soil,
      })),
    );

    await soilDataRepo.save(createdSoilDataArray);

    return createdSoilDataArray;
  }
}

export default CreateSoilDataService;
