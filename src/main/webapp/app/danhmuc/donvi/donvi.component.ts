import {Component, ViewChild} from '@angular/core';
import { DanhMucDonViService } from 'app/entities/danh-muc-don-vi/service/danh-muc-don-vi.service';
import SharedModule from 'app/shared/shared.module';
import {DonviFormComponent} from "../../form/donvi-form/donvi-form.component";
import {IDanhMucDonVi} from "../../entities/danh-muc-don-vi/danh-muc-don-vi.model";
import FormatMediumDatePipe from "../../shared/date/format-medium-date.pipe";
import FormatMediumDatetimePipe from "../../shared/date/format-medium-datetime.pipe";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import dayjs from "dayjs/esm";
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
  originalData: any[] = [];

  pageIndex: number = 1;
  pageSize: number = 10;

  @ViewChild(DonviFormComponent) donviFormComponent!: DonviFormComponent;

  constructor(protected danhMucDonViService: DanhMucDonViService,
              private modalService: NzModalService,
              private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.danhMucDonViService.query().subscribe({
      next: (res) => {
        this.originalData = res.body || []; // Lưu trữ dữ liệu gốc
        this.listOfData = [...this.originalData]; // Cập nhật listOfData với dữ liệu gốc
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
    this.searchTerm = searchTerm;

    if (this.searchTerm) {
      this.listOfData = this.originalData.filter(item =>
        (item.tenDonVi?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (item.diaChi?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (item.nguoiDaiDien?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (item.soDienThoai?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false) ||
        (item.ngayKhaiBao ? dayjs(item.ngayKhaiBao).format('DD/MM/YYYY').includes(this.searchTerm) : false)
      );
    } else {
      this.listOfData = [...this.originalData];
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
    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa đơn vị này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzCancelText: 'Không',
      nzMaskClosable: true,
      nzOnOk: () => {
        this.danhMucDonViService.delete(item.idDonVi).subscribe({
          next: () => {
            this.loadData(); // Refresh data after successful deletion
            this.notification.success('Xóa thành công', 'Đơn vị đã được xóa thành công!'); // Show success notification
          },
          error: (err) => {
            console.error('Error deleting data', err);
            this.notification.error('Lỗi xóa dữ liệu', 'Có lỗi xảy ra khi xóa đơn vị.');
          }
        });
      },
      nzOnCancel: () => {
        console.log('Hủy xóa'); // Optional: Log or handle cancel action
      }
    });
  }


  onFormDataUpdated(): void {
    this.loadData();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucDonVi[]) {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }
}


