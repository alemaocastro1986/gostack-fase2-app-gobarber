import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
