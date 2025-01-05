import { Injectable } from '@nestjs/common';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitProgressDto } from './dto/update-habit-progress.dto';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class HabitProgressService {
  constructor(private prisma: PrismaService) {}

  // Create habit progress
  async create(createHabitProgressDto: CreateHabitProgressDto) {
    const { habitId, date, status, notes } = createHabitProgressDto;
    return this.prisma.habitProgress.create({
      data: {
        habitId,
        date,
        status,
        notes,
      },
    });
  }

  // Get progress for a specific habit
  async getHabitProgress(habitId: number) {
    return this.prisma.habitProgress.findMany({
      where: {
        habitId,
      },
    });
  }

  // Get all progress for a user (across all habits)
  async getUserProgress(userId: number) {
    return this.prisma.habitProgress.findMany({
      where: {
        habit: {
          userId,
        },
      },
      include: {
        habit: true, // Include habit details if needed
      },
    });
  }

  // Update habit progress
  async update(
      progressId: number,
      updateHabitProgressDto: UpdateHabitProgressDto,
  ) {
    return this.prisma.habitProgress.update({
      where: { id: progressId },
      data: updateHabitProgressDto,
    });
  }

  // Delete habit progress
  async delete(progressId: number) {
    return this.prisma.habitProgress.delete({
      where: { id: progressId },
    });
  }
}
