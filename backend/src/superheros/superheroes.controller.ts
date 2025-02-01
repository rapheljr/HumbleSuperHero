import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroDto } from './superhero.dto';
import { ValidationPipe } from './validate.pipe';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  addSuperhero(@Body(new ValidationPipe()) superheroDto: SuperheroDto) {
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
