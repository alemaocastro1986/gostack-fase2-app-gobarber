import { Router } from 'express';

import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.patch('/', profileController.updated);
profileRouter.get('/', profileController.show);

export default profileRouter;
