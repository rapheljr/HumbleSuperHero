import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroDto } from './superhero.dto';

@Controller('superheroes')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  addSuperhero(@Body() superheroDto: SuperheroDto) {
    this.superheroesService.addSuperhero(
      superheroDto.name,
      superheroDto.superpower,
      superheroDto.humilityScore,
    );
    return { message: 'Superhero added successfully' };
  }

  @Get()
  getSuperheroes() {
    return this.superheroesService.getSuperheroes();
  }
}
