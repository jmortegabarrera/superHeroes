import { Component, OnInit } from '@angular/core';
import { SuperHero } from './core/models/superhero/superhero.model';
import { SuperHeroesService } from './core/services/super-heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SuperHeroesApp';

}

