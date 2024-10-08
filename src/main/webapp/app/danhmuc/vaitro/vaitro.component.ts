import { Component } from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IDanhMucVaiTro, NewDanhMucVaiTro} from 'app/entities/danh-muc-vai-tro/danh-muc-vai-tro.model';
import {IDanhMucDonVi} from "../../entities/danh-muc-don-vi/danh-muc-don-vi.model";
import {ITaiSan} from "../../entities/tai-san/tai-san.model";
import {DanhMucVaiTroService} from "../../entities/danh-muc-vai-tro/service/danh-muc-vai-tro.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'jhi-vaitro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vaitro.component.html',
  styleUrl: './vaitro.component.scss'
})
export class VaitroComponent {
  listOfData: readonly IDanhMucVaiTro[] = [];
  searchTerm: string = '';
  selectedItem: IDanhMucVaiTro | null = null;
  listOfCurrentPageData: readonly IDanhMucVaiTro[] = [];

  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 1;
  isEditing: boolean = false;
  isVisible: boolean = false;
  newItem: IDanhMucVaiTro = {
    danhMucLoaiHopDong: undefined,
    dienGiai: undefined,
    idLoaiVaiTro: undefined,
    idVaiTro: ""};
  modalTitle: string = '';

  constructor(private danhMucVaiTroService: DanhMucVaiTroService,
              private modal: NzModalService,
              private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.loadData();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucVaiTro[]): void {
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

  loadData(): void {
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.danhMucVaiTroService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onSearch() {
    this.danhMucVaiTroService.filterByDienGiai(this.searchTerm).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  addNewItem() {
    this.isEditing = false;
    this.modalTitle = 'Thêm vai trò';
    this.isVisible = true;
  }

  editItem(item: IDanhMucVaiTro) {
    this.isEditing = true;
    this.modalTitle = 'Cập nhật vai trò';
    this.isVisible = true;
    this.newItem = {
      idVaiTro: item.idVaiTro,
      dienGiai: item.dienGiai || null,
      idLoaiVaiTro: item.idLoaiVaiTro || null,
      danhMucLoaiHopDong: item.danhMucLoaiHopDong || null
    };
  }

  deleteItem(item: IDanhMucVaiTro) {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa vai trò này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzCancelText: 'Không',
      nzMaskClosable: true,
      nzOnOk: () => this.deleteVaiTro(item.idVaiTro)
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  // Hàm thêm mới vai trò
  handleOk(): void {
    if (this.isEditing) {
      this.updateVaiTro();
    } else {
      this.saveVaiTro();
    }
    this.resetForm();
  }

  removeAccentsAndSpaces(str: string): string {
    return str
      .normalize('NFD') // Chuẩn hóa chuỗi để tách các ký tự có dấu
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
      .replace(/\s+/g, ''); // Xóa khoảng trắng
  }

  saveVaiTro(): void {
    if (this.newItem.dienGiai) {
      const generatedIdVaiTro = this.removeAccentsAndSpaces(this.newItem.dienGiai); // Tạo idVaiTro từ dienGiai
      const newItemToSave: NewDanhMucVaiTro = {
        ...this.newItem,
        idVaiTro: generatedIdVaiTro // Sử dụng idVaiTro đã tạo
      };

      this.danhMucVaiTroService.create(newItemToSave).subscribe({
        next: () => {
          this.notification.success('Thông báo', 'Thêm vai trò thành công');
          this.isVisible = false;
          this.loadData();
        },
        error: (error) => {
          console.error('Error creating vai tro:', error);
          this.notification.error('Thông báo', 'Thêm vai trò thất bại');
        }
      });
    } else {
      this.notification.error('Thông báo', 'Diễn giải không được để trống');
    }
  }

  // Hàm cập nhật vai trò
  updateVaiTro(): void {
    this.danhMucVaiTroService.filterByDienGiai(this.newItem.dienGiai || '').subscribe({
      next: (response) => {
        const existingItems = response.body || [];

        this.danhMucVaiTroService.update(this.newItem).subscribe({
          next: () => {
            this.notification.success('Thông báo', 'Cập nhật vai trò thành công');
            this.isVisible = false;
            this.loadData();
          },
          error: (error) => {
            console.error('Error updating vai tro:', error);
            this.notification.error('Thông báo', 'Cập nhật vai trò thất bại');
          }
        });
      },
      error: (error) => {
        console.error('Error checking dien giai:', error);
        this.notification.error('Thông báo', 'Có lỗi xảy ra khi kiểm tra diễn giải');
      }
    });
  }

  deleteVaiTro(id: string) {
    this.danhMucVaiTroService.delete(id).subscribe({
      next: () => {
        this.notification.success('Thông báo', 'Xóa vai trò thành công');
        // Cập nhật lại danh sách vai trò nếu cần
        this.loadData(); // Giả sử bạn có một phương thức để tải lại danh sách
      },
      error: (err) => {
        console.error('Error deleting vai tro', err);
        this.notification.error('Thông báo', 'Xóa vai trò thất bại');
      }
    });
  }

  resetForm() {
    this.newItem = {
      danhMucLoaiHopDong: undefined, dienGiai: undefined, idLoaiVaiTro: undefined, idVaiTro: ""
    }
  }
}
