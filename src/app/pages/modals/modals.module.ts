import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditHeroModalComponent } from './edit-hero-modal/edit-hero-modal.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditHeroModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ]
})
export class ModalsModule { }
