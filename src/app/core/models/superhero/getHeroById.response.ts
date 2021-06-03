import { SuperHero } from './superhero.model';

export class GetHeroByIdResponse {
  hero: SuperHero

  constructor(hero) {
    this.hero = hero;
  }
}
