import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateHabitProgressDto {
    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    notes?: string;
}
