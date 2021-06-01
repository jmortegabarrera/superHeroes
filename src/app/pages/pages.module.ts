import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HeroCardComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class PagesModule { }
