import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import HandlebarsTemplateMailProvider from '@shared/container/providers/TemplateMailProvider/implementations/HandlebarsTemplateMailProvider';

container.registerSingleton<IStorageProvider>(
  'UsersRepository',
  DiskStorageProvider,
);

container.registerSingleton<ITemplateMailProvider>(
  'TemplateMailProvider',
  HandlebarsTemplateMailProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
