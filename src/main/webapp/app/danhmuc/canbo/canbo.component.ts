import {Component, OnInit} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import dayjs from 'dayjs';

@Component({
  selector: 'jhi-canbo',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './canbo.component.html',
  styleUrl: './canbo.component.scss'
})
export class CanboComponent implements OnInit {

  // Dropdown lists for Đơn vị and Quyền
  danhSachDonVi = [
    { id: 1, tenDonVi: 'Phòng A' },
    { id: 2, tenDonVi: 'Phòng B' },
    { id: 3, tenDonVi: 'Phòng C' },
  ];

  danhSachQuyen = [
    { id: 1, tenQuyen: 'Admin' },
    { id: 2, tenQuyen: 'User' },
  ];

  // Selected dropdown values
  selectedDonVi: number | null = null;
  selectedQuyen: number | null = null;

  // Full dataset
  listOfData = [
    { id: 1, tenCanBo: 'Nguyễn Văn A', namSinh: '1985', email: 'a@example.com', diaChi: 'Hà Nội', idDonVi: 1, trangThai: 'Active' },
    { id: 2, tenCanBo: 'Trần Thị B', namSinh: '1990', email: 'b@example.com', diaChi: 'TP Hồ Chí Minh', idDonVi: 2, trangThai: 'Inactive' },
    { id: 3, tenCanBo: 'Lê Văn C', namSinh: '1987', email: 'c@example.com', diaChi: 'Đà Nẵng', idDonVi: 3, trangThai: 'Active' },
    // Add more data here
  ];

  // Displayed data for the current page
  displayedData: any[] = [];

  // Pagination properties
  pageSize = 10;
  pageIndex = 1;
  total = this.listOfData.length;

  searchValue = '';

  constructor() { }

  ngOnInit(): void {
    // Initialize displayed data
    this.onCurrentPageDataChange();
  }

  // Handle search input change
  onSearchChange(): void {
    this.filterData();
  }

  // Handle Đơn vị dropdown change
  onDonViChange(): void {
    this.filterData();
  }

  // Handle Quyền dropdown change
  onQuyenChange(): void {
    this.filterData();
  }

  // Method to filter and paginate data based on search, selected Đơn vị, Quyền
  filterData(): void {
    let filteredData = this.listOfData;

    // Apply search filter
    if (this.searchValue) {
      filteredData = filteredData.filter(item =>
        item.tenCanBo.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    }

    // Apply Đơn vị filter
    if (this.selectedDonVi) {
      filteredData = filteredData.filter(item => item.idDonVi === this.selectedDonVi);
    }

    // Update the total and filter data based on search and selected filters
    this.total = filteredData.length;

    // Paginate the filtered data
    this.onCurrentPageDataChange(filteredData);
  }

  // Method to handle changes in pagination and update the displayed data
  onCurrentPageDataChange(filteredData: readonly any[] = this.listOfData): void {
    const dataToShow = [...filteredData];  // Spread operator to make a copy (mutable array)

    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = this.pageIndex * this.pageSize;

    this.displayedData = dataToShow.slice(startIndex, endIndex);
  }

  // Handle page index change
  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.onCurrentPageDataChange();
  }

  // Handle page size change
  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.onCurrentPageDataChange();
  }

  // Get Đơn vị name by id
  getDonViById(idDonVi: number): string {
    const donVi = this.danhSachDonVi.find(dv => dv.id === idDonVi);
    return donVi ? donVi.tenDonVi : 'N/A';
  }

  // Get formatted date using dayjs
  getFormattedDate(dateString: string): string {
    return dayjs(dateString).format('DD/MM/YYYY');
  }

  // Action methods (Edit, Delete, Reset Password)
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
    console.log('Thêm mới cán bộ');
  }
}
