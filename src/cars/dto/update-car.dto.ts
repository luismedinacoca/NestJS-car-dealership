import { IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: 'The brand must be a cool string' })
  @IsOptional()
  readonly brand?: string;

  @IsString({ message: 'Model is mandatory' })
  @IsOptional()
  @MinLength(3)
  readonly model?: string;
}
