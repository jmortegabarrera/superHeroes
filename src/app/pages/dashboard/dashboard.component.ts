import { Component, OnInit } from '@angular/core';
import { SuperHero } from '../../core/models/superhero/superhero.model';
import { SuperHeroesService } from '../../core/services/super-heroes.service';
import { FilterInput } from '../../core/models/shared/filter.input';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: SuperHero[];
  totalHeroes: number;
  filter: FilterInput;

  constructor(
    private readonly superHeroesService: SuperHeroesService,
  ) { }

  ngOnInit() {
    this.filter = new FilterInput();
    this.reloadHeroes(this.filter);

    this.superHeroesService.getAllHeroesCount$().subscribe(result => {
      this.totalHeroes = result;
    });
  }

  private reloadHeroes(filter: FilterInput) {
    this.superHeroesService.getAllHeroes$(filter).subscribe(result => {
      this.heroes = result.heroes;
    });
  }
}
