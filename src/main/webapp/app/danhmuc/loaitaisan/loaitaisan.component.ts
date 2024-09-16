import { Component } from '@angular/core';
import SharedModule from '../../shared/shared.module';
import { DanhMucLoaiTaiSanService } from '../../entities/danh-muc-loai-tai-san/service/danh-muc-loai-tai-san.service';
import { IDanhMucLoaiTaiSan, NewDanhMucLoaiTaiSan } from '../../entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';

@Component({
  selector: 'jhi-loaitaisan',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loaitaisan.component.html',
  styleUrl: './loaitaisan.component.scss'
})
export class LoaitaisanComponent {
  searchTerm: string = '';
  listOfData: IDanhMucLoaiTaiSan[] = [];
  filteredData: IDanhMucLoaiTaiSan[] = [];

  isVisible = false;
  isEditMode = false;
  newItem: IDanhMucLoaiTaiSan = { idLoaiTs: 0, dienGiai: '' }; // Đối với thêm mới, sử dụng id = 0 hoặc 0 cho id

  constructor(private danhMucLoaiTaiSanService: DanhMucLoaiTaiSanService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.danhMucLoaiTaiSanService.query().subscribe(response => {
      this.listOfData = response.body || [];
      this.filteredData = [...this.listOfData]; // Ban đầu, filteredData sẽ chứa toàn bộ dữ liệu
    });
  }

  onSearch(term: string): void {
    this.filteredData = this.listOfData.filter(item =>
      (item.dienGiai?.toLowerCase() ?? '').includes(term.toLowerCase())
    );
  }

  addNew(): void {
    this.isEditMode = false;
    this.newItem = { idLoaiTs: 0, dienGiai: '' };
    this.isVisible = true;
  }

  editItem(item: IDanhMucLoaiTaiSan): void {
    this.isEditMode = true;  // Set chế độ chỉnh sửa
    this.newItem = { ...item };  // Gán dữ liệu của item vào form
    if (!this.newItem.idLoaiTs) {
      console.error('ID của item không hợp lệ:', item);
      alert('ID của mục không hợp lệ.');
      return;
    }
    this.isVisible = true;  // Hiển thị modal
  }

  handleOk(): void {
    const existingItemByDienGiai = this.listOfData.find(item => item.dienGiai === this.newItem.dienGiai);

    if (this.isEditMode) {
      if (existingItemByDienGiai && existingItemByDienGiai.idLoaiTs !== this.newItem.idLoaiTs) {
        alert('Loại tài sản đã tồn tại.');
        return;
      }
      if (this.newItem.idLoaiTs && this.newItem.idLoaiTs !== 0) {
        this.danhMucLoaiTaiSanService.update(this.newItem).subscribe(
          () => {
            console.log('Cập nhật thành công');
            this.loadData();
            this.isVisible = false;
            this.newItem = { idLoaiTs: 0, dienGiai: '' };
          },
          (error) => {
            console.error('Lỗi khi cập nhật mục:', error);
            alert('Có lỗi xảy ra khi cập nhật mục. Vui lòng thử lại.');
          }
        );
      } else {
        console.error('ID của item không hợp lệ:', this.newItem);
        alert('ID của mục không hợp lệ.');
      }
    } else if (this.newItem.dienGiai) {
      if (existingItemByDienGiai) {
        alert('Loại tài sản đã tồn tại.');
      } else {
        const newItemForCreation: NewDanhMucLoaiTaiSan = {
          idLoaiTs: null,
          dienGiai: this.newItem.dienGiai,
          trangThai: this.newItem.trangThai ?? 1
        };
        this.danhMucLoaiTaiSanService.create(newItemForCreation).subscribe(
          () => {
            alert('Thêm mới thành công');
            this.loadData();
            this.isVisible = false;
            this.newItem = { idLoaiTs: 0, dienGiai: '' };
          },
          (error) => {
            console.error('Lỗi khi thêm mới mục:', error);
            alert('Có lỗi xảy ra khi thêm mới mục. Vui lòng thử lại.');
          }
        );
      }
    }
  }

  handleCancel(): void {
    this.isVisible = false;  // Hide modal on cancel
  }

  deleteItem(item: IDanhMucLoaiTaiSan): void {
    if (item.idLoaiTs !== undefined && item.idLoaiTs !== null) {
      this.danhMucLoaiTaiSanService.delete(item.idLoaiTs).subscribe(
        () => {
          this.loadData();  // Reload dữ liệu sau khi xóa thành công
        },
        (error) => {
          console.error('Lỗi khi xóa mục:', error);
        }
      );
    } else {
      console.error('ID của item không hợp lệ:', item);
    }
  }
}
