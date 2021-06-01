import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { FilterInput } from '../../core/models/shared/filter.input';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() length = 10;
  @Output() filterUpdated = new EventEmitter();
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  filter: FilterInput;

  constructor(
    private paginator: MatPaginatorIntl
  ) {
    this.paginator.itemsPerPageLabel = "Heroes por página";
    this.paginator.lastPageLabel = "Última página";
    this.paginator.nextPageLabel = "Siguiente";
    this.paginator.previousPageLabel = "Anterior";
  }
  ngOnInit(): void {
    const paginator = {
      pageIndex: this.length,
      pageSize: this.pageSize,
    }
    this.filter = new FilterInput(paginator)
  }

  updatePagination(paginator) {
    this.filterUpdated.emit(paginator);
  }

}
