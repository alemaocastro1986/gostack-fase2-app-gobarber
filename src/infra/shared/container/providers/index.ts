import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import MailtrapProvider from './MailProvider/implementations/MailtrapProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
container.registerSingleton<IMailProvider>('MailProvider', MailtrapProvider);
