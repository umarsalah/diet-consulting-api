import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @Transform(({ value }: TransformFnParams) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty()
  @IsString()
  userNameOrEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
