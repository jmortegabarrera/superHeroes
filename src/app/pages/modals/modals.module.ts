import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditHeroModalComponent } from './edit-hero-modal/edit-hero-modal.component'
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EditHeroModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
  ]
})
export class ModalsModule { }
