import { Inject, Injectable } from '@nestjs/common';

import { PROVIDERS } from 'src/common/constants';
import { Users } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(PROVIDERS.USERS_PROVIDER)
    private readonly usersRepository: typeof Users,
  ) {}

  async getPatientName(id: number): Promise<{
    firstName: string;
    lastName: string;
  }> {
    const patient = await this.usersRepository.findOne({
      where: { id },
    });
    return { firstName: patient.firstName, lastName: patient.lastName };
  }
  async getUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
