import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/uploads';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/users/CreateUsersService';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    return response.json({ ok: true });
  },
);

export default usersRoute;
