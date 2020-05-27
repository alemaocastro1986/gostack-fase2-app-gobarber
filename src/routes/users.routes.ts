import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/uploads';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/users/CreateUsersService';
import UpdateUserAvatarService from '../services/users/UpdateUsersAvatarService';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password });
  delete user.password;

  return response.json(user);
});

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRoute;
