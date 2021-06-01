export class FilterInput {
  page = 1;
  limit = 10;
  order: string;

  constructor(
    page?, order = 'asc'
  ) {
    if (page) {
      this.page = page.pageIndex;
      this.limit = page.pageSize;
    }
    this.order = order;
  }
}
