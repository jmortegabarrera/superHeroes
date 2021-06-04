import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuperHero } from '../../core/models/superhero/superhero.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditHeroModalComponent } from '../modals/edit-hero-modal/edit-hero-modal.component';
import { DeleteHeroInput } from '../../core/models/superhero/deleteHero.input';
import { SuperHeroesService } from '../../core/services/super-heroes.service';
import Swal from 'sweetalert2';
import { GetHeroesByNameInput } from '../../core/models/superhero/getHeroesByName.input';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: SuperHero;
  @Input() filter: GetHeroesByNameInput;
  @Output() needReload = new EventEmitter<GetHeroesByNameInput>();
  loading = false;

  constructor(
    private readonly modalService: NgbModal,
    private readonly superHeroesService: SuperHeroesService,
  ) { }

  ngOnInit(): void {
  }

  openEditHeroModal() {
    const modalRef = this.modalService.open(EditHeroModalComponent);
    modalRef.componentInstance.hero = this.hero;
    modalRef.componentInstance.reloadHeroes.subscribe((result) => {
      this.needReload.emit(this.filter);
    })
  }

  deleteHero(id) {
    const deleteinput = new DeleteHeroInput();
    deleteinput.id = parseInt(id);

    Swal.fire({
      title: 'Do you want to delete the hero?',
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.superHeroesService.deleteHero$(deleteinput).subscribe(result => {
          if (result) {
            Swal.fire('Deleted!', '', 'success')
            this.needReload.emit(this.filter);
            this.loading = false;
          } else {
            this.loading = false;
            Swal.fire('Not deleted', '', 'error')
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Not deleted', '', 'error')
      }
    })
  }

}
