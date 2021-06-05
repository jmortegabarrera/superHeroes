import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditHeroModalComponent } from '../modals/edit-hero-modal/edit-hero-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() searchHeroesEvent = new EventEmitter<any>();
  @Output() orderHeroesEvent = new EventEmitter<string>();
  @Input() totalHeroesForId: number;
  searchString = '';
  searchId = 0;
  order = 'asc';
  searchType = false;

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
    if (!this.searchType) {
      const searchData = { searchString: this.searchString, type: this.searchType }
      this.searchHeroesEvent.emit(searchData);
    }
    if (this.searchType) {
      const searchData = { searchString: this.searchId, type: this.searchType }
      this.searchHeroesEvent.emit(searchData);
    }
  }

  swapSearch() {
    this.searchType = !this.searchType;
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
