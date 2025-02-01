import { IsString, Min, Max, IsNumber } from 'class-validator';

export class SuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
