import { SuperHero } from './superhero.model';

export class GetHeroesByNameResponse {
  heroes: SuperHero[]

  constructor(heroes) {
    this.heroes = heroes;
  }
}
