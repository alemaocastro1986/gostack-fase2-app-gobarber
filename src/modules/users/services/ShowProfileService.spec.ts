import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('Should be able to return user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123546',
    });

    const updatedUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('Jane Doe');
    expect(updatedUser.email).toBe('janedoe@teste.com');
  });

  it('Should not be able to return the profile if there is no user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
