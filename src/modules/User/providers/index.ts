import { container } from 'tsyringe';

import IHashProvider from '@modules/User/providers/models/IHashProvider';
import BCryptHashProvider from '@modules/User/providers/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
