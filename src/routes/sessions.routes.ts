import { Router, Request, Response } from 'express';

import CreateSessionService from '../services/sessions/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const createSession = new CreateSessionService();
    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRoutes;
