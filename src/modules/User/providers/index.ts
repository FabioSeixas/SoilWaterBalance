import { container } from 'tsyringe';

import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/User/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
