import AppError from '@shared/errors/AppError';
import SoilData from '@modules/Project/infra/typeorm/entities/SoilData';
import SoilsRepository from '@modules/Project/infra/typeorm/repositories/SoilsRepository';
import SoilsDataRepository from '@modules/Project/infra/typeorm/repositories/SoilsDataRepository';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';

class CreateSoilDataService {
  constructor(
    private soilsRepository: SoilsRepository,
    private soilsDataRepository: SoilsDataRepository,
  ) {}

  public async execute(
    soilDataArray: ICreateSoilDataDTO[],
  ): Promise<ICreateSoilDataDTO[]> {
    const soil = await this.soilsRepository.findById(soilDataArray[0].soil_id);

    if (!soil) {
      throw new AppError('Soil Id not found.', 400);
    }

    const readySoilDataArray: SoilData[] = soilDataArray.map(dataByDepth => {
      dataByDepth.soil = soil;
      return dataByDepth as SoilData;
    });

    const createdSoilDataArray = this.soilsDataRepository.create(
      readySoilDataArray.map((dataByDepth: ICreateSoilDataDTO) => ({
        soil_id: dataByDepth.soil_id,
        saturation: dataByDepth.saturation,
        wilt_point: dataByDepth.wilt_point,
        start_depth: dataByDepth.start_depth,
        end_depth: dataByDepth.end_depth,
        field_cap: dataByDepth.field_cap,
        soil: dataByDepth.soil,
      })),
    );

    return createdSoilDataArray;
  }
}

export default CreateSoilDataService;
