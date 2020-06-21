import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id, month, year, day } = request.body;
    const listProviderDays = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providerDaysAvailability = await listProviderDays.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providerDaysAvailability);
  }
}
