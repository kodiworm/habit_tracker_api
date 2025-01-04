import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HabitService {
  constructor(private readonly prisma: PrismaService) {}

  create(createHabitDto: CreateHabitDto, userId:number) {
    const { name, description, frequency } = createHabitDto;

    return this.prisma.habit.create({
      data: {
        name,
        description,
        frequency,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.habit.findMany();
  }

  findOne(id: number) {
    return this.prisma.habit.findFirst({
      where: { id }
    });
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    // First, find the habit by its ID
    const habit = await this.prisma.habit.findUnique({
      where: { id }
    });

    // If the habit doesn't exist, throw an error
    if (!habit) {
      throw new Error(`Habit with ID #${id} not found`);
    }

    // Proceed to update the habit
    const updatedHabit = await this.prisma.habit.update({
      where: { id },
      data: updateHabitDto
    });

    // Return the updated habit or a meaningful message
    return updatedHabit;
  }

  remove(id: number) {
    return this.prisma.habit.deleteMany({
      where: { id }
    });
  }
}
