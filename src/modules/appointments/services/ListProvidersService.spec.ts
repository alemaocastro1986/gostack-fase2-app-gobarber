// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('Should be able to list of providers', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123546',
    });

    const user_one = await fakeUserRepository.create({
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      password: 'Bret',
    });
    const user_two = await fakeUserRepository.create({
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      password: 'Antonette',
    });
    const user_tre = await fakeUserRepository.create({
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      password: 'Samantha',
    });

    const users = await listProvidersService.execute({
      user_id: user.id,
    });

    expect(users).not.toEqual(expect.arrayContaining([user]));
    expect(users).toEqual([user_one, user_two, user_tre]);
  });
});
