import { Router } from 'express';

import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

// providersRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
