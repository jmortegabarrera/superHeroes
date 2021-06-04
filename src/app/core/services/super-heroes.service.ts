import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { GetAllHeroesResponse } from '../models/superhero/getAllHeroes.response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterInput } from '../models/shared/filter.input';
import { GetHeroByIdInput } from '../models/superhero/getHeroById.input';
import { GetHeroByIdResponse } from '../models/superhero/getHeroById.response';
import { GetHeroesByNameResponse } from '../models/superhero/getHeroesByName.response';
import { GetHeroesByNameInput } from '../models/superhero/getHeroesByName.input';
import { DeleteHeroInput } from '../models/superhero/deleteHero.input';
import { UpdateHeroInput } from '../models/superhero/updateHero.input';
import { CreateHeroInput } from '../models/superhero/createHero.input';
import { SuperHero } from '../models/superhero/superhero.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  urlBackend = environment.backendEndpoint;
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllHeroes$(filter: FilterInput): Observable<GetAllHeroesResponse> {
    return this.httpClient.get(`${this.urlBackend}/superheroes` + '?_page=' + filter.page + '&' + '_limit=' + filter.limit + '&_sort=name&_order=' + filter.order).pipe(map(
      result => {
        const heroes = this.mapNativeToSuperHero(result)
        return new GetAllHeroesResponse(heroes);
      }
    ))
  }

  getAllHeroesCount$(): Observable<number> {
    return this.httpClient.get(`${this.urlBackend}/superheroes`).pipe(map(
      result => {
        return Object.keys(result).length;
      }
    ))
  }

  getAllHeroesFilteredCount$(getHeroesByNameInput: GetHeroesByNameInput): Observable<number> {
    return this.httpClient.get(`${this.urlBackend}/superheroes?name_like=` + getHeroesByNameInput.name).pipe(map(
      result => {
        return Object.keys(result).length;
      }
    ))
  }

  getHeroById$(getHeroByIdInput: GetHeroByIdInput): Observable<GetHeroByIdResponse> {
    return this.httpClient.get(`${this.urlBackend}/superheroes?id=` + getHeroByIdInput.id).pipe(map(
      result => {
        return new GetHeroByIdResponse(result[0])
      }
    ))
  }

  getHeroByName$(getHeroesByNameInput: GetHeroesByNameInput): Observable<GetHeroesByNameResponse> {
    return this.httpClient.get(`${this.urlBackend}/superheroes` + '?_page=' + getHeroesByNameInput.filter.page
      + '&' + '_limit=' + getHeroesByNameInput.filter.limit + '&name_like=' + getHeroesByNameInput.name + '&_sort=name&_order=' + getHeroesByNameInput.filter.order)
      .pipe(map(
        result => {
          const heroes = this.mapNativeToSuperHero(result)
          return new GetHeroesByNameResponse(heroes)
        }
      ))
  }

  deleteHero$(deleteHero: DeleteHeroInput): Observable<boolean> {
    return this.httpClient.delete(`${this.urlBackend}/superheroes/` + deleteHero.id).pipe(map(
      result => {
        return true;
      }
    ))
  }

  updateHero$(updateHeroInput: UpdateHeroInput): Observable<boolean> {
    const url = `${this.urlBackend}/superheroes/` + updateHeroInput.superHeroInput.id;
    updateHeroInput.superHeroInput.name = this.capitalizeFirstLetter(updateHeroInput.superHeroInput.name);
    updateHeroInput.superHeroInput.images = { lg: updateHeroInput.superHeroInput.images }

    return this.httpClient
      .patch(url, JSON.stringify(updateHeroInput.superHeroInput), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }

  createHero$(createHeroInput: CreateHeroInput): Observable<boolean> {
    const url = `${this.urlBackend}/superheroes/`;
    createHeroInput.superHeroInput.name = this.capitalizeFirstLetter(createHeroInput.superHeroInput.name);
    createHeroInput.superHeroInput.images = { lg: createHeroInput.superHeroInput.images }

    return this.httpClient
      .post(url, JSON.stringify(createHeroInput.superHeroInput), { headers: this.headers })
      .pipe(map(
        result => {
          return true;
        }
      ))
  }

  private mapNativeToSuperHero(result: Object) {
    return Object.values(result).map(hero => {
      return new SuperHero(hero.id, hero.name, hero.powerstats, hero.images.lg);
    });
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
