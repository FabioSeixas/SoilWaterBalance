import AppError from '@shared/errors/AppError';

import FakeSoilsRepository from '@modules/Project/repositories/fakes/FakeSoilsRepository';
import CreateSoilService from '@modules/Project/services/CreateSoilService';

describe('CreateNewSoil', () => {
  it('should create a new Soil', async () => {
    const fakeSoilRepository = new FakeSoilsRepository();
    const createSoilService = new CreateSoilService(fakeSoilRepository);

    const data = {
      name: 'NovoSoloTeste',
      text_class: 'argiloso',
      total_depth: 200,
      author_id: '12312412',
    };

    const newSoil = await createSoilService.execute(data);

    expect(newSoil).toHaveProperty('id');
    expect(newSoil.author_id).toBe('12312412');
  });

  it('should not be able to create a new Soil with a name that already exists', async () => {
    const fakeSoilRepository = new FakeSoilsRepository();
    const createSoilService = new CreateSoilService(fakeSoilRepository);

    await createSoilService.execute({
      name: 'NovoSoloTeste',
      text_class: 'argiloso',
      total_depth: 200,
      author_id: '12312412',
    });

    expect(
      createSoilService.execute({
        name: 'NovoSoloTeste',
        text_class: 'argiloso',
        total_depth: 200,
        author_id: '568456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Soil with total depth higher than 500 cm', async () => {
    const fakeSoilRepository = new FakeSoilsRepository();
    const createSoilService = new CreateSoilService(fakeSoilRepository);

    expect(
      createSoilService.execute({
        name: 'NovoSoloTeste',
        text_class: 'argiloso',
        total_depth: 600,
        author_id: '568456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
