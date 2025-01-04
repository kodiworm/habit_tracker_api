import { Injectable } from '@nestjs/common';
import { CreateHabitProgressDto } from './dto/create-habit-progress.dto';
import { UpdateHabitProgressDto } from './dto/update-habit-progress.dto';

@Injectable()
export class HabitProgressService {
  create(createHabitProgressDto: CreateHabitProgressDto) {
    return 'This action adds a new habitProgress';
  }

  findAll() {
    return `This action returns all habitProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitProgress`;
  }

  update(id: number, updateHabitProgressDto: UpdateHabitProgressDto) {
    return `This action updates a #${id} habitProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitProgress`;
  }
}
