export class FilterInput {
  page: number;
  limit: number;
  order: string;

  constructor(
    page?, order = 'asc'
  ) {
    console.log(this.page)
    if (this.page) {
      this.page = page.pageIndex;
      this.limit = page.pageSize;
    }
    this.order = order;
  }
}
