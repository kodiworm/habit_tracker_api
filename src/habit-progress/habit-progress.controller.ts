import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitProgressService } from './habit-progress.service';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitProgressDto } from './dto/update-habit-progress.dto';

@Controller('habit-progress')
export class HabitProgressController {
  constructor(private readonly habitProgressService: HabitProgressService) {}

  @Post()
  create(@Body() createHabitProgressDto: CreateHabitProgressDto) {
    return this.habitProgressService.create(createHabitProgressDto);
  }

  @Get()
  findAll() {
    return this.habitProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitProgressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitProgressDto: UpdateHabitProgressDto) {
    return this.habitProgressService.update(+id, updateHabitProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitProgressService.remove(+id);
  }
}
