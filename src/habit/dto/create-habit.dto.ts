import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  frequency: number;
}
