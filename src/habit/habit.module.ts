import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [HabitController],
  providers: [HabitService, PrismaService],
})
export class HabitModule {}
