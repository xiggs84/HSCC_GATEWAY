import { Component } from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {IDanhMucLoaiHopDong} from "../../entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model";
import {DanhMucLoaiHopDongService} from "../../entities/danh-muc-loai-hop-dong/service/danh-muc-loai-hop-dong.service";

@Component({
  selector: 'jhi-loaihopdong',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loaihopdong.component.html',
  styleUrl: './loaihopdong.component.scss'
})
export class LoaihopdongComponent {
  listOfData: readonly IDanhMucLoaiHopDong[] = [];
  searchValue: string = '';
  listOfCurrentPageData: readonly IDanhMucLoaiHopDong[] = [];
  selectedItem: IDanhMucLoaiHopDong | null = null;
  originalData: any[] = [];
  total: number = 1;
  isEditing: boolean = false;
  isVisible: boolean = false;
  isLoading: boolean = false;
  modalTitle: string = '';

  pageIndex: number = 1;
  pageSize: number = 10;

  selectedDonVi: number | null = null;
  selectedHopDongFile: string | null = null;
  selectedLoiChungFile: string | null = null;

  newItem: IDanhMucLoaiHopDong = {
    chuyenTaiSan: undefined,
    danhMucNhomHopDong: undefined,
    dgTen: undefined,
    dienGiai: undefined,
    dieuKhoan: undefined,
    fileHopDong: undefined,
    fileLoiChung: undefined,
    idDonVi: undefined,
    idLoaiHd: "",
    idPhanLoaiHopDong: undefined,
    idVaiTro1: undefined,
    idVaiTro2: undefined,
    idVaiTro3: undefined,
    loaiHuyBo: undefined,
    loaiSuaDoi: undefined,
    ngayThaoTac: undefined,
    nguoiThaoTac: undefined,
    nhomTen: undefined,
    srcCv: undefined,
    srcHopDong: undefined,
    srcLoiChung: undefined,
    srcTb: undefined,
    srcTtpc: undefined,
    trangThai: undefined,
    trangThaiDuyet: undefined

  };

  danhSachDonVi = [
    { id: 1, tenDonVi: 'Phòng A' },
    { id: 2, tenDonVi: 'Phòng B' },
    { id: 3, tenDonVi: 'Phòng C' },
  ];
  tenLoaiHopDong: any;

  constructor(private danhMucLoaiHopDongService: DanhMucLoaiHopDongService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.danhMucLoaiHopDongService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onDonViChange(): void {
  }

  onSearchChange() {

  }

  addNewItem() {
    this.modalTitle = "Thêm loại hợp đồng";
    this.isVisible = true;
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDanhMucLoaiHopDong[]): void {
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

  getDonViById(number: number) {
    return "";
  }

  getPhanLoaiHopDongById(number: number) {
    return "";
  }

  getDienGiaiById(number: number) {
    return "";
  }

  onEdit(item: IDanhMucLoaiHopDong) {
    this.modalTitle = "Cập nhật loại hợp đồng";
    this.isVisible = true;
  }

  onDelete(item: IDanhMucLoaiHopDong) {

  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  getDienGiaiNhomHopDongById(idNhom: string | undefined) {
    return "";
  }

  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0].name;
      if (type === 'hopDong') {
        this.selectedHopDongFile = file;
      } else if (type === 'loiChung') {
        this.selectedLoiChungFile = file;
      }
    }
  }

}
