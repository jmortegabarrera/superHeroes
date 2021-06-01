import { SuperHero } from './superhero.model';
export class GetAllHeroesResponse {
  heroes: SuperHero[]

  constructor(heroes) {
    this.heroes = heroes;
  }
}
