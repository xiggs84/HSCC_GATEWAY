import {Component, NgIterable, ViewChild} from '@angular/core';
import SharedModule from "../../shared/shared.module";
import {ITaiSan} from "../../entities/tai-san/tai-san.model";
import {IDuongSu} from "../../entities/duong-su/duong-su.model";
import {TaiSanService} from "../../entities/tai-san/service/tai-san.service";
import {TaisanFormComponent} from "../../form/taisan-form/taisan-form.component";
import {IDanhMucLoaiTaiSan} from "../../entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import dayjs from "dayjs/esm";
import {
  ThongTinCapNhatTaiSanService
} from "../../entities/thong-tin-cap-nhat-tai-san/service/thong-tin-cap-nhat-tai-san.service";
import {LichsucapnhatComponent} from "../../thaotac/lichsucapnhat/lichsucapnhat.component";
import {ChiTietNganChanService} from "../../entities/chi-tiet-ngan-chan/service/chi-tiet-ngan-chan.service";
import {IChiTietNganChan} from "../../entities/chi-tiet-ngan-chan/chi-tiet-ngan-chan.model";
import {TinhtrangnganchanComponent} from "../../thaotac/tinhtrangnganchan/tinhtrangnganchan.component";
import {ThemthongtinnganchanComponent} from "../../thaotac/themthongtinnganchan/themthongtinnganchan.component";

@Component({
  selector: 'jhi-taisan',
  standalone: true,
  imports: [SharedModule, TaisanFormComponent, LichsucapnhatComponent, TinhtrangnganchanComponent, ThemthongtinnganchanComponent],
  templateUrl: './taisan.component.html',
  styleUrl: './taisan.component.scss'
})
export class TaisanComponent {
  selectedUnit: any;
  loaiTaiSanOptions: any;
  searchValue: any;
  listOfData: readonly ITaiSan[] = [];
  pageSize: number = 10;
  pageIndex: number = 1;
  listOfCurrentPageData: readonly ITaiSan[] = [];
  originalData: ITaiSan[] = [];
  isEditing: boolean = false;
  containmentStatusData: IChiTietNganChan[] = [];

  @ViewChild('taiSanForm') taiSanFormComponent: any;

  dsActions = [
    { icon: 'history', tooltip: 'Lịch sử cập nhật', type: 'history' },
    { icon: 'transaction', tooltip: 'Lịch sử giao dịch', type: 'historytrade' },
    { icon: 'alert', tooltip: 'Tình trạng ngăn chặn', type: 'containmentstatus' },
    { icon: 'plus', tooltip: 'Thêm mới thông tin ngăn chặn', type: 'addcontainmentstatus' },
    { icon: 'edit', tooltip: 'Chỉnh sửa thông tin tài sản', type: 'editinformation' },
    { icon: 'delete', tooltip: 'Xóa', type: 'delete' }
  ];

  DanhMucLoaiTaiSan: IDanhMucLoaiTaiSan[] = [
    {idLoaiTs: 1, dienGiai: 'Đất không có tài sản gắn liền'},
    {idLoaiTs: 2, dienGiai: 'Ô tô'},
    {idLoaiTs: 3, dienGiai: 'Xe máy'},
    {idLoaiTs: 4, dienGiai: 'Đất có tài sản gắn liền'},
    {idLoaiTs: 5, dienGiai: 'Phương tiện thuỷ nội địa'},
    {idLoaiTs: 6, dienGiai: 'Sổ tiết kiệm'},
    {idLoaiTs: 7, dienGiai: 'Giấy chứng nhận quyền sở hữu nhà ở'},
    {idLoaiTs: 8, dienGiai: 'Tàu cá'},
  ];
  total: number = 1;
  modalColumns: string[] = [];
  modalData: any[] = [];
  isHistoryModalVisible = false;
  isContainmentStatusModalVisible = false;
  isAddContainmentStatusModalVisible = false;
  selectedItem: ITaiSan | null = null;
  addContainmentStatusData: any;

  constructor(private taiSanService: TaiSanService,
              private thongTinCapNhatTaiSanService: ThongTinCapNhatTaiSanService,
              private chiTietNganChanService: ChiTietNganChanService,
              private modal: NzModalService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  onUnitChange() {
    this.pageIndex = 1;
    const queryParams = {
      'danhMucLoaiTaiSanId.equals': this.selectedUnit, // Thêm .equals để đúng định dạng
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize,
    };

    this.taiSanService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onSearchChange() {
    const queryParams = {
      'tenTaiSan.contains': this.searchValue,
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize,
    };

    this.taiSanService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  resetData() {
    this.pageIndex = 1;
    this.loadData();
  }

  addNewItem() {
    this.isEditing = false;
    this.taiSanFormComponent.modalTitle = 'Thêm tài sản';
    this.taiSanFormComponent.showModal();
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ITaiSan[]): void {
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

  onActionClick(actionType: string, data: any) {
    switch (actionType) {
      case 'history':
        this.showHistoryModal(data);
        break;
      case 'containmentstatus':
        this.showContainmentStatusModal(data);
        break;
      case 'addcontainmentstatus':
        this.showAddContainmentStatusModal(data);
        break;
      case 'delete':
        this.showDeleteConfirm(data.idTaiSan);
        break;
      case 'editinformation':
        this.editTaiSan(data);
        break;
      default:
        console.error('Unknown action type:', actionType);
    }
  }

  loadData(): void {
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.taiSanService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  updateCurrentPageData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listOfCurrentPageData = this.listOfData.slice(startIndex, endIndex);
  }

  onFormDataUpdated() {
    this.loadData();
  }

  getDienGiaiById(idLoaiTs: number | undefined): string {
    const loaiTaiSan = this.DanhMucLoaiTaiSan.find(loai => loai.idLoaiTs === idLoaiTs);
    return loaiTaiSan?.dienGiai ?? 'N/A';
  }

  deleteTaiSan(id: number): void {
    this.taiSanService.delete(id).subscribe({
      next: () => {
        this.notification.success('Thông báo', 'Xóa tài sản thành công');
        // Cập nhật lại danh sách tài sản nếu cần
        this.loadData(); // Giả sử bạn có một phương thức để tải lại danh sách
      },
      error: (err) => {
        console.error('Error deleting tai san', err);
        this.notification.error('Thông báo', 'Xóa tài sản thất bại');
      }
    });
  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa tài sản này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzCancelText: 'Không',
      nzMaskClosable: true,
      nzOnOk: () => this.deleteTaiSan(id)
    });
  }

  showHistoryModal(data: ITaiSan): void {
    const queryParams = {
      'taiSanId.equals': data.idTaiSan
    };

    this.thongTinCapNhatTaiSanService.query(queryParams).subscribe({
      next: (response) => {
        this.modalColumns = ['Tên tài sản', 'Loại tài sản', 'Thông tin tài sản', 'Ngày cập nhật'];
        this.modalData = response.body?.map(item => ({
          'Tên tài sản': item.tenTaiSan || null,
          'Loại tài sản': this.getDienGiaiById(item.danhMucLoaiTaiSan?.idLoaiTs! ?? null),
          'Thông tin tài sản': item.thongTinTaiSan || null,
          'Ngày cập nhật': dayjs(item.ngayCapNhat).format('DD/MM/YYYY'),
        })) || [];
        this.isHistoryModalVisible = true;
      },
      error: (err) => {
        console.error('Lỗi khi lấy lịch sử cập nhật:', err);
      }
    });
  }

  handleCancelModal(): void {
    this.isHistoryModalVisible = false;
    // this.isHistoryTradeModalVisible = false;
    this.isContainmentStatusModalVisible = false;
    this.isAddContainmentStatusModalVisible = false;
  }

  editTaiSan(item: ITaiSan) {
    this.selectedItem = item;
    this.isEditing = true;
    this.taiSanFormComponent.modalTitle = 'Cập nhật tài sản';
    this.taiSanFormComponent.showModal();
    this.taiSanFormComponent.loadItemData(item);
    this.taiSanFormComponent.selectedLoaiTaiSan = item.danhMucLoaiTaiSan?.idLoaiTs ?? null;
  }

  showContainmentStatusModal(data: ITaiSan): void {
    const queryParams = {
      'idDoiTuong.equals': data.idTaiSan,
      'loaiDoiTuong.equals': 2,
    };
    this.selectedItem = data;
    this.chiTietNganChanService.query(queryParams).subscribe({
      next: (response) => {
        this.containmentStatusData = response.body || []; // Lưu dữ liệu ngăn chặn
        this.isContainmentStatusModalVisible = true; // Hiển thị modal
      },
      error: () => {
      }
    });
  }

  showAddContainmentStatusModal(data: ITaiSan): void {
    this.addContainmentStatusData = {
      idDoiTuong: data.idTaiSan,
      loaiDoiTuong: 2,
      loaiNganChan: undefined,
    };
    console.log('addContainmentStatusData:', this.addContainmentStatusData); // Log the data
    this.isAddContainmentStatusModalVisible = true;
  }
}
