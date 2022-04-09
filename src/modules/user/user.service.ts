import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Op } from 'sequelize';

import { Users } from './user.model';
import { SignupDto } from './dto/signup.dto';
import { ERRORS, PROVIDERS, User } from 'src/common/constants';
import { generateToken, hashPassword } from 'src/common/utils';

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
    return { firstName: patient?.firstName, lastName: patient?.lastName };
  }

  async getUserByUserNameOrEmail(userNameOrEmail: {
    email?: string;
    userName?: string;
  }): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        [Op.or]: [
          { email: userNameOrEmail.email },
          { userName: userNameOrEmail.userName },
        ],
      },
    });
  }

  async signup(newUserInfo: SignupDto): Promise<User> {
    try {
      // check if there is a user with the same email or username
      const userWithSameEmailOrUsername = await this.getUserByUserNameOrEmail({
        email: newUserInfo.email,
        userName: newUserInfo.userName,
      });
      if (userWithSameEmailOrUsername) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: ERRORS.USER_ALREADY_EXISTS,
          },
          HttpStatus.CONFLICT,
        );
      }
      // Hash the new user password
      newUserInfo.password = await hashPassword(newUserInfo.password);
      // Create the new user
      const newUser = await this.usersRepository.create({
        ...newUserInfo,
        createdBy: newUserInfo.userName,
        updatedBy: newUserInfo.userName,
      });
      return {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        userName: newUser.userName,
        token: generateToken(newUser.userName),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
