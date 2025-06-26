import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class OpenAccountDto {
  @ApiPropertyOptional({
    description: 'Optional initial deposit amount.',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  initialDeposit?: number;

  @ApiProperty({
    description: 'Optional user name.',
    minLength: 3,
    maxLength: 20,
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName!: string;
}
