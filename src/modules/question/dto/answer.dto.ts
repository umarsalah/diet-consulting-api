import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { trimmer } from 'src/common/utils/trimmer';

export class AnswerDto {
  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  recommendations?: string;
}
