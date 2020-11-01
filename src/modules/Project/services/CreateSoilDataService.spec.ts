import FakeSoilsRepository from '@modules/Project/repositories/fakes/FakeSoilsRepository';
import FakeSoilsDataRepository from '@modules/Project/repositories/fakes/FakeSoilsDataRepository';
import CreateSoilDataService from '@modules/Project/services/CreateSoilDataService';
import AppError from '@shared/errors/AppError';

describe('CreateSoilData', () => {
  it('should create new Soil Data', async () => {
    const fakeSoilRepository = new FakeSoilsRepository();
    const fakeSoilsDataRepository = new FakeSoilsDataRepository();

    const createSoilDataService = new CreateSoilDataService(
      fakeSoilRepository,
      fakeSoilsDataRepository,
    );

    const soil = await fakeSoilRepository.create({
      name: 'NovoSoloTeste',
      text_class: 'argiloso',
      total_depth: 200,
      author_id: '12312412',
    });

    const soilData = [
      {
        soil_id: soil.id,
        saturation: 0.4,
        wilt_point: 0.2,
        start_depth: 0,
        end_depth: 100,
        field_cap: 0.3,
      },
      {
        soil_id: soil.id,
        saturation: 0.4,
        wilt_point: 0.2,
        start_depth: 100,
        end_depth: 200,
        field_cap: 0.3,
      },
    ];

    const newSoil = await createSoilDataService.execute(soilData);

    expect(newSoil).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String) }),
      ]),
    );

    expect(newSoil).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ soil: expect.any(Object) }),
      ]),
    );
  });

  it('should not create Soil Data for an inexisting Soil Id', async () => {
    const fakeSoilRepository = new FakeSoilsRepository();
    const fakeSoilsDataRepository = new FakeSoilsDataRepository();

    const createSoilDataService = new CreateSoilDataService(
      fakeSoilRepository,
      fakeSoilsDataRepository,
    );

    const soilData = [
      {
        soil_id: '1234567',
        saturation: 0.4,
        wilt_point: 0.2,
        start_depth: 0,
        end_depth: 100,
        field_cap: 0.3,
      },
    ];

    expect(createSoilDataService.execute(soilData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
