import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuperHero } from '../../core/models/superhero/superhero.model';
import { SuperHeroesService } from '../../core/services/super-heroes.service';
import { FilterInput } from '../../core/models/shared/filter.input';
import { GetHeroesByNameInput } from '../../core/models/superhero/getHeroesByName.input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.filter = new FilterInput();
    this.getHeroesByNameInput.filter = this.filter;
    this.reloadHeroes(this.filter);
  }

  reloadHeroes(filter: FilterInput) {
    this.getInitialHeroes(filter);
  }

  searchHeroes(name: string) {
    this.getHeroesByNameInput.name = name;
    this.getHeroesByNameInput.filter = this.filter;
    this.getHeroesFiltered();
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
    this.searchHeroes(this.getHeroesByNameInput.name);
  }
}
