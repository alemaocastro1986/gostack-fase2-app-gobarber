import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(AuthenticationUserService);
    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
