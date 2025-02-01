import { SuperheroesService } from './superheroes.service';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(() => {
    service = new SuperheroesService();
  });

  it('should add and retrieve superheroes sorted by humility', () => {
    service.addSuperhero('Superman', 'Fighting', 5);
    service.addSuperhero('Spider-Man', 'Nothing', 8);
    const heroes = service.getSuperheroes();
    expect(heroes[0].name).toBe('Spider-Man');
  });
});
