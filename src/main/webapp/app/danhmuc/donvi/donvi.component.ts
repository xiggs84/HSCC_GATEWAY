import {Component, ViewChild} from '@angular/core';
import { DanhMucDonViService } from 'app/entities/danh-muc-don-vi/service/danh-muc-don-vi.service';
import SharedModule from 'app/shared/shared.module';
import {DonviFormComponent} from "../../form/donvi-form/donvi-form.component";
import {IDanhMucDonVi} from "../../entities/danh-muc-don-vi/danh-muc-don-vi.model";
import FormatMediumDatePipe from "../../shared/date/format-medium-date.pipe";
import FormatMediumDatetimePipe from "../../shared/date/format-medium-datetime.pipe";
@Component({
  selector: 'jhi-donvi',
  standalone: true,
  imports: [SharedModule, DonviFormComponent, FormatMediumDatePipe, FormatMediumDatetimePipe],
  templateUrl: './donvi.component.html',
  styleUrl: './donvi.component.scss'
})
export class DonviComponent {
  listOfData: readonly IDanhMucDonVi[] = [];
  searchTerm: string = '';
  listOfCurrentPageData: readonly IDanhMucDonVi[] = [];
  selectedItem: IDanhMucDonVi | null = null;

  pageIndex: number = 1;
  pageSize: number = 10;

  @ViewChild(DonviFormComponent) donviFormComponent!: DonviFormComponent;

  constructor(protected danhMucDonViService: DanhMucDonViService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.danhMucDonViService.query().subscribe({
      next: (res) => {
        this.listOfData = res.body || [];
        this.updateCurrentPageData();
      },
      error: (err) => console.error('Error fetching data', err),
    });
  }

  updateCurrentPageData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listOfCurrentPageData = this.listOfData.slice(startIndex, endIndex);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateCurrentPageData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 1; // Reset to first page when page size changes
    this.updateCurrentPageData();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm; // Cập nhật giá trị tìm kiếm

    if (this.searchTerm) {
      this.listOfData = this.listOfData.filter(item =>
        item.tenDonVi?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false
      );
    } else {
      // Reload original data
      this.loadData();
    }
  }

  addNewItem(): void {
    this.donviFormComponent.modalTitle = 'Thêm đơn vị';
    this.donviFormComponent.showModal();
  }

  editItem(item: IDanhMucDonVi): void {
    this.selectedItem = item;
    this.donviFormComponent.modalTitle = 'Cập nhật đơn vị';
    this.donviFormComponent.showModal();
    this.donviFormComponent.loadItemData(item);
  }

  deleteItem(item: IDanhMucDonVi): void {
    this.danhMucDonViService.delete(item.idDonVi).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => console.error('Error deleting data', err),
    });
  }

  onFormDataUpdated(): void {
    this.loadData();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucDonVi[]) {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }
}


