import { container } from 'tsyringe';

import '@modules/User/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';

import ISoilsRepository from '@modules/Project/repositories/ISoilsRepository';
import SoilsRepository from '@modules/Project/infra/typeorm/repositories/SoilsRepository';

import ISoilsDataRepository from '@modules/Project/repositories/ISoilsDataRepository';
import SoilsDataRepository from '@modules/Project/infra/typeorm/repositories/SoilsDataRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISoilsRepository>(
  'SoilsRepository',
  SoilsRepository,
);

container.registerSingleton<ISoilsDataRepository>(
  'SoilsDataRepository',
  SoilsDataRepository,
);
