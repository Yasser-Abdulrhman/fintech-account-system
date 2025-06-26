import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'The ID of the account for the transaction.' })
  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @ApiProperty({
    description: 'The amount for the transaction.',
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  amount: number;
}
