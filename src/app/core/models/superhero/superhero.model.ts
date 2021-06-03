import { Powers } from './powers.model';
export class SuperHero {
  id: string;
  name: string;
  powerstats: Powers;
  image: string;

  constructor(id, name, powerstats, image) {
    this.id = id;
    this.name = name;
    this.powerstats = powerstats;
    this.image = image;
  }
}
