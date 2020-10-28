import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSoilDataService from '@modules/Project/services/CreateSoilDataService';
import ICreateSoilDataDTO from '@modules/Project/dtos/ICreateSoilDataDTO';

export default class SoilsDataController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { soil_id } = request.params;
    const reqBody = request.body;

    const soilDataArray: ICreateSoilDataDTO[] = reqBody.map(
      (dataByDepth: ICreateSoilDataDTO) => {
        dataByDepth.soil_id = soil_id;
        return dataByDepth;
      },
    );

    const createSoilData = container.resolve(CreateSoilDataService);

    const newSoilData = await createSoilData.execute(soilDataArray);

    return response.json(newSoilData);
  }
}
