// src/superheroes/superheroes.module.ts
import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';

@Module({
  providers: [SuperheroesService],
  controllers: [SuperheroesController],
})
export class SuperheroesModule {}
