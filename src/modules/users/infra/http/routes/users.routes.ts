import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@shared/config/uploads';

import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoute = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoute.post('/', usersController.create);

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoute;
