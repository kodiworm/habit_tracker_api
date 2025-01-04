import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitProgressDto } from './create-habit-progress.dto';

export class UpdateHabitProgressDto extends PartialType(CreateHabitProgressDto) {}
