import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from '@nestjs/common';
import { HabitProgressService } from './habit-progress.service';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitProgressDto } from './dto/update-habit-progress.dto';
import {AuthGuard} from "../auth/guards/auth.guard";

@Controller('habit-progress')
export class HabitProgressController {
  constructor(private readonly habitProgressService: HabitProgressService) {}

  @Post()
  create(@Body() createHabitProgressDto: CreateHabitProgressDto) {
    return this.habitProgressService.create(createHabitProgressDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findUserProgress(@Request() req) {
    const userId = req.user.userId;
    return this.habitProgressService.getUserProgress(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitProgressService.getHabitProgress(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitProgressDto: UpdateHabitProgressDto) {
    return this.habitProgressService.update(+id, updateHabitProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitProgressService.delete(+id);
  }
}
