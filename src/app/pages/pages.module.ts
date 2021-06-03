import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ModalsModule } from './modals/modals.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroCardComponent,
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    ModalsModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class PagesModule { }
