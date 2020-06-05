import { Router, Request, Response } from 'express';

import CreateSessionService from '../services/sessions/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();
  const { user, token } = await createSession.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoutes;
