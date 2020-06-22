import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);
