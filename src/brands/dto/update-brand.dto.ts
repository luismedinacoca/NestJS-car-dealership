/* When we have more than one property:
import { PartialType } from '@nestjs/swagger';
import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsString()
  @MinLength(1)
  name: string;
}
*/

// minimum to update
import { IsString, MinLength } from 'class-validator';
export class UpdateBrandDto {
  @IsString()
  @MinLength(1)
  name: string;
}
