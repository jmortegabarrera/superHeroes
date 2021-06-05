import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuperHero } from '../../core/models/superhero/superhero.model';
import { SuperHeroesService } from '../../core/services/super-heroes.service';
import { FilterInput } from '../../core/models/shared/filter.input';
import { GetHeroesByNameInput } from '../../core/models/superhero/getHeroesByName.input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetHeroByIdInput } from '../../core/models/superhero/getHeroById.input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: SuperHero[];
  totalHeroes: number;
  totalHeroesForId: number;
  filter: FilterInput;
  getHeroesByNameInput = new GetHeroesByNameInput();

  constructor(
    private readonly superHeroesService: SuperHeroesService,
    private readonly toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.filter = new FilterInput();
    this.getHeroesByNameInput.filter = this.filter;
    this.reloadHeroes(this.filter);
  }

  reloadHeroes(filter: FilterInput) {
    this.getInitialHeroes(filter);
  }

  searchHeroes(event?: any) {
    if (!event || !event.type) {
      this.getHeroesByNameInput.name = event.searchString;
      this.getHeroesByNameInput.filter = this.filter;
      this.getHeroesFiltered();
    } else {
      const getHeroByIdInput = new GetHeroByIdInput();
      getHeroByIdInput.id = event.searchString;
      this.superHeroesService.getHeroById$(getHeroByIdInput).subscribe(result => {
        if (!result) {
          this.toastService.error('Not found hero with this id');
          return;
        }
        this.heroes = [result.hero];
        this.totalHeroes = [result.hero].length;
      });
    }
  }

  getHeroesFiltered(getHeroesByNameInput?: GetHeroesByNameInput) {
    if (getHeroesByNameInput) {
      this.getHeroesByNameInput = getHeroesByNameInput;
    }
    this.superHeroesService.getHeroByName$(this.getHeroesByNameInput).subscribe(result => {
      this.heroes = result.heroes;
      this.totalHeroes = result.heroes.length;
    });
    this.superHeroesService.getAllHeroesFilteredCount$(this.getHeroesByNameInput).subscribe(result => {
      this.totalHeroes = result;
      if (this.totalHeroes === 0) {
        this.toastService.error('Not found hero with this name');
      }
    });
  }

  private getInitialHeroes(filter: FilterInput) {
    this.superHeroesService.getAllHeroes$(filter).subscribe(result => {
      this.heroes = result.heroes;
    });
    this.superHeroesService.getAllHeroesCount$().subscribe(result => {
      this.totalHeroes = result;
    });
  }

  orderHeroes(order: string) {
    this.filter.order = order;
    this.searchHeroes({ searchString: this.getHeroesByNameInput.name });
  }
}
