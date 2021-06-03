import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditHeroModalComponent } from '../modals/edit-hero-modal/edit-hero-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() searchHeroesEvent = new EventEmitter<string>();
  @Output() orderHeroesEvent = new EventEmitter<string>();
  @Input() totalHeroesForId: number;
  searchString = '';
  order = 'asc';

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openAddHeroModal() {
    const modalRef = this.modalService.open(EditHeroModalComponent);
    modalRef.componentInstance.totalHeroesForId = this.totalHeroesForId;
    modalRef.componentInstance.reloadHeroes.subscribe((result) => {
      this.searchHeroes();
    })
  }

  searchHeroes() {
    this.searchHeroesEvent.emit(this.searchString);
  }

  orderHeroes() {
    if (this.order === 'desc') {
      this.order = 'asc';
    } else if (this.order === 'asc') {
      this.order = 'desc'
    }
    this.orderHeroesEvent.emit(this.order)
  }

}
