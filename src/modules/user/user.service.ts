import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { SignupDto, LoginDto } from './dto';
import { User } from 'src/common/types';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { generateToken, hashPassword, comparePassword } from 'src/common/utils';

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
    return { firstName: patient?.firstName, lastName: patient?.lastName };
  }

  async getUserByUserNameOrEmail(userNameOrEmail: {
    email?: string;
    userName?: string;
  }): Promise<Users> {
    const where: any = {};
    if (userNameOrEmail.email) {
      where.email = userNameOrEmail.email;
    } else if (userNameOrEmail.userName) {
      where.userName = userNameOrEmail.userName;
    }
    console.log('where', where);

    return this.usersRepository.findOne({
      where: {
        ...where,
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
      });
      return {
        user: {
          id: newUser.id,
          role: newUser.role,
          email: newUser.email,
          userName: newUser.userName,
        },
        token: generateToken(newUser.userName),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async login(loginInfo: LoginDto): Promise<User> {
    try {
      // user can login by his email or username
      const user = await this.getUserByUserNameOrEmail({
        email: loginInfo.userNameOrEmail,
        userName: loginInfo.userNameOrEmail,
      });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ERRORS.INCORRECT_DATA,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      // check if the password is correct
      const isPasswordCorrect = await comparePassword(
        loginInfo.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: ERRORS.INCORRECT_DATA,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        user: {
          id: user.id,
          role: user.role,
          email: user.email,
          userName: user.userName,
        },
        token: generateToken(user.userName),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
