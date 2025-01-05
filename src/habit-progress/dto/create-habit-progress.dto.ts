import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitProgressDto {
    @IsNotEmpty()
    habitId: number;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    notes?: string;
}
