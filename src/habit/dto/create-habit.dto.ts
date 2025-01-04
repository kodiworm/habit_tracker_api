import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {Frequency} from "../../core/common/enums";

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Frequency)
  frequency: Frequency;
}
