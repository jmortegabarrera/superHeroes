import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { GetAllHeroesResponse } from '../models/superhero/getAllHeroes.response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FilterInput } from '../models/shared/filter.input';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  urlBackend = environment.backendEndpoint;
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllHeroes$(filter: FilterInput): Observable<GetAllHeroesResponse> {
    return this.httpClient.get( `${this.urlBackend}/superheroes`+'?_page='+filter.page+'&'+'_limit='+filter.limit).pipe(map(
      result => {
        return new GetAllHeroesResponse(result)
      }
    ))

  }
}
