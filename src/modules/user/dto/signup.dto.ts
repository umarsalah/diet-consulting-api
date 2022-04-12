import { Transform } from 'class-transformer';
import { ERRORS, ROLES } from 'src/common/constants';
import {
  IsEnum,
  Matches,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';
import { trimmer } from 'src/common/utils/trimmer';

export class SignupDto {
  @Transform(trimmer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  middleName?: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsEnum(ROLES, {
    message: 'Type is not valid',
  })
  role: ROLES;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    // example: 'Password1!'
    message: ERRORS.PASSWORD_VALIDATION_ERROR,
  })
  password: string;
}
