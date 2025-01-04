import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { HabitService } from './habit.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import {AuthGuard} from "../auth/guards/auth.guard";

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createHabitDto: CreateHabitDto, @Request() req) {
    const userId = req.user.userId;
    return this.habitService.create(createHabitDto, userId);
  }

  @Get()
  findAll() {
    return this.habitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitDto: UpdateHabitDto) {
    return this.habitService.update(+id, updateHabitDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitService.remove(+id);
  }
}
