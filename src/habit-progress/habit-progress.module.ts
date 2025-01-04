import { Module } from '@nestjs/common';
import { HabitProgressService } from './habit-progress.service';
import { HabitProgressController } from './habit-progress.controller';

@Module({
  controllers: [HabitProgressController],
  providers: [HabitProgressService],
})
export class HabitProgressModule {}
