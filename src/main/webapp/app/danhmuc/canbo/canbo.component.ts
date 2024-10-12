import {Component, OnInit, ViewChild} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import dayjs from 'dayjs';
import {DonviFormComponent} from "../../form/donvi-form/donvi-form.component";
import {CanboFormComponent} from "../../form/canbo-form/canbo-form.component";
import {IDanhMucCanBo} from "../../entities/danh-muc-can-bo/danh-muc-can-bo.model";
import {DanhMucCanBoService} from "../../entities/danh-muc-can-bo/service/danh-muc-can-bo.service";

@Component({
  selector: 'jhi-canbo',
  standalone: true,
  imports: [SharedModule, CanboFormComponent],
  templateUrl: './canbo.component.html',
  styleUrl: './canbo.component.scss'
})
export class CanboComponent implements OnInit {
  listOfData: readonly IDanhMucCanBo[] = [];
  searchValue: string = '';
  listOfCurrentPageData: readonly IDanhMucCanBo[] = [];
  selectedItem: IDanhMucCanBo | null = null;
  originalData: any[] = [];
  total: number = 1;

  pageIndex: number = 1;
  pageSize: number = 10;

  danhSachDonVi = [
    { id: 1, tenDonVi: 'Phòng A' },
    { id: 2, tenDonVi: 'Phòng B' },
    { id: 3, tenDonVi: 'Phòng C' },
  ];

  danhSachQuyen = [
    { id: 1, tenQuyen: 'Admin' },
    { id: 2, tenQuyen: 'User' },
  ];

  selectedDonVi: number | null = null;
  selectedQuyen: number | null = null;

  constructor(private danhMucCanBoService: DanhMucCanBoService) { }

  @ViewChild(CanboFormComponent) canboFormComponent!: CanboFormComponent;

  ngOnInit(): void {
    this.loadData();
  }

  onSearchChange(): void {
  }

  // Handle Đơn vị dropdown change
  onDonViChange(): void {
  }

  // Handle Quyền dropdown change
  onQuyenChange(): void {
  }

  filterData(): void {
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucCanBo[]): void {
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

  getDonViById(idDonVi: number): string {
    const donVi = this.danhSachDonVi.find(dv => dv.id === idDonVi);
    return donVi ? donVi.tenDonVi : 'N/A';
  }

  loadData(): void {
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.danhMucCanBoService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  getFormattedDate(dateString: string): string {
    return dayjs(dateString).format('DD/MM/YYYY');
  }

  onEdit(item: any): void {
    console.log('Edit item:', item);
  }

  onDelete(item: any): void {
    console.log('Delete item:', item);
  }

  onResetPassword(item: any): void {
    console.log('Reset password for:', item);
  }

  onAssignRole(item: any): void {
    console.log('Reset password for:', item);
  }

  onLockAccount(item: any): void {
    console.log('Reset password for:', item);
  }

  addNewItem() {
    this.canboFormComponent.modalTitle = 'Thêm cán bộ';
    this.canboFormComponent.showModal();
  }
}
