import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id: id });
    delete user.password;
    return response.json(user);
  }

  public async updated(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, old_password, password } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      name,
      email,
      password,
      old_password,
      user_id: request.user.id,
    });

    delete user.password;

    return response.json(user);
  }
}
