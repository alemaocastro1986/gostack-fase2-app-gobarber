import { Router } from 'express';

import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
