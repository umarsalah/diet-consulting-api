import { Transform, TransformFnParams } from 'class-transformer';
import { ROLES } from 'src/common/constants';
import {
  IsEnum,
  Matches,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

export class SignupDto {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsAlphanumeric()
  userName: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  middleName?: string;

  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsNotEmpty()
  @IsEnum(ROLES, {
    message: 'Type is not valid',
  })
  role: ROLES;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and must be at least 8 characters long',
  })
  password: string; // example: 'Password1!'
}
