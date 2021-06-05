import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SuperHeroesService } from './super-heroes.service';
import { FilterInput } from '../models/shared/filter.input';
import { GetAllHeroesResponse } from '../models/superhero/getAllHeroes.response';
import { SuperHero } from '../models/superhero/superhero.model';

fdescribe('SuperHeroesService', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SuperHeroesService]
    });
    service = TestBed.inject(SuperHeroesService);
    
  });
  
  it('should get all heroes', () => {
    const filter = createFilter()
    const hero = new SuperHero(1,'1','1','1');
    const getAllHeroesResponse = new GetAllHeroesResponse(hero)
    service.getAllHeroes$(filter).subscribe(result => {
      expect(result).toBe(getAllHeroesResponse)
    })
    expect(service).toBeTruthy();
  });  
  it('should get all heroes count', () => {
    service.getAllHeroesCount$().subscribe(result => {
      expect(result).toBe(0)
    })
    expect(service).toBeTruthy();
  });
});


function createFilter() {
  return new FilterInput();
}

