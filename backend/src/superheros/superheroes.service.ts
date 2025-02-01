import { Injectable } from '@nestjs/common';
import { Superhero } from './superhero.model';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [];

  addSuperhero(name: string, superpower: string, humilityScore: number) {
    const newHero: Superhero = { name, superpower, humilityScore };
    this.superheroes.push(newHero);
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
