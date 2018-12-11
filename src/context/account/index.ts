import AccountRepo from './repo';
import { IAccount, SignupInput } from 'types/account';

const accountRepo = new AccountRepo();

export default {
  exists: (email: string) => accountRepo.exists(email),
  findForLogin: (email: string): Promise<IAccount | null> =>
    accountRepo.findForLogin(email),
  create: (data: SignupInput): Promise<IAccount> => accountRepo.create(data),
};
