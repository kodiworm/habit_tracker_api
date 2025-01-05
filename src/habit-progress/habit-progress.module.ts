import { Module } from '@nestjs/common';
import { HabitProgressService } from './habit-progress.service';
import { HabitProgressController } from './habit-progress.controller';
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  controllers: [HabitProgressController],
  providers: [HabitProgressService, PrismaService],
})
export class HabitProgressModule {}
