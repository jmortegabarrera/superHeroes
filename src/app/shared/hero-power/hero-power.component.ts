import { Component, Input, OnInit } from '@angular/core';
import { Powers } from '../../core/models/superhero/powers.model';

@Component({
  selector: 'app-hero-power',
  templateUrl: './hero-power.component.html',
  styleUrls: ['./hero-power.component.scss']
})
export class HeroPowerComponent implements OnInit {

  @Input() powers: Powers;

  constructor() { }

  ngOnInit(): void {
  }

}
