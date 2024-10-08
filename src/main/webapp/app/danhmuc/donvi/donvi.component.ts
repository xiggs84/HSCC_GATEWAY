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
import {ITaiSan} from "../../entities/tai-san/tai-san.model";
@Component({
  selector: 'jhi-donvi',
  standalone: true,
  imports: [SharedModule, DonviFormComponent, FormatMediumDatePipe, FormatMediumDatetimePipe],
  templateUrl: './donvi.component.html',
  styleUrl: './donvi.component.scss'
})
export class DonviComponent {
  listOfData: readonly IDanhMucDonVi[] = [];
  searchValue: string = '';
  listOfCurrentPageData: readonly IDanhMucDonVi[] = [];
  selectedItem: IDanhMucDonVi | null = null;
  originalData: any[] = [];
  total: number = 1;

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
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.danhMucDonViService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucDonVi[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadData();
  }

  onSearchChange() {
    const queryParams = {
      'tenDonVi.contains': this.searchValue, // Thêm .equals để đúng định dạng
      page: this.pageIndex - 1,
      size: this.pageSize,
    };

    this.danhMucDonViService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
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
}


