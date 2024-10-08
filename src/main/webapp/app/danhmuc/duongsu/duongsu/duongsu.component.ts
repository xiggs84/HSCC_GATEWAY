import {Component, OnInit, ViewChild} from '@angular/core';
import SharedModule from "../../../shared/shared.module";
import {DuongSuService} from "../../../entities/duong-su/service/duong-su.service";
import {LoaiDuongSu} from "../../../entities/enumerations/loai-duong-su.model";
import {IDuongSu} from "../../../entities/duong-su/duong-su.model";
import { DuongsuFormComponent } from "../../../form/duongsu-form/duongsu-form.component";
import {LichsucapnhatComponent} from "../../../thaotac/lichsucapnhat/lichsucapnhat.component";
import {LichsugiaodichduongsuComponent} from "../../../thaotac/lichsugiaodichduongsu/lichsugiaodichduongsu.component";
import {TinhtrangnganchanComponent} from "../../../thaotac/tinhtrangnganchan/tinhtrangnganchan.component";
import {ThemthongtinnganchanComponent} from "../../../thaotac/themthongtinnganchan/themthongtinnganchan.component";
import {ThongtinvochongComponent} from "../../../thaotac/thongtinvochong/thongtinvochong.component";
import {ThemthongtinvochongComponent} from "../../../thaotac/themthongtinvochong/themthongtinvochong.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {LoaiDuongSuService} from "../../../entities/loai-duong-su/service/loai-duong-su.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import dayjs from "dayjs/esm";
import {IChiTietNganChan} from "../../../entities/chi-tiet-ngan-chan/chi-tiet-ngan-chan.model";
import {ChiTietNganChanService} from "../../../entities/chi-tiet-ngan-chan/service/chi-tiet-ngan-chan.service";
import {IThongTinCapNhatDuongSu} from "../../../entities/thong-tin-cap-nhat-duong-su/thong-tin-cap-nhat-duong-su.model";
import {
  ThongTinCapNhatDuongSuService
} from "../../../entities/thong-tin-cap-nhat-duong-su/service/thong-tin-cap-nhat-duong-su.service";
import {ITaiSan} from "../../../entities/tai-san/tai-san.model";

@Component({
  selector: 'jhi-duongsu',
  standalone: true,
  imports: [SharedModule, DuongsuFormComponent, LichsucapnhatComponent, LichsugiaodichduongsuComponent, TinhtrangnganchanComponent, ThemthongtinnganchanComponent, ThongtinvochongComponent, ThemthongtinvochongComponent],
  templateUrl: './duongsu.component.html',
  styleUrl: './duongsu.component.scss'
})
export class DuongsuComponent implements OnInit {
  listOfData: readonly IDuongSu[] = [];
  listOfCurrentPageData: readonly IDuongSu[] = [];
  searchValue: string = '';
  selectedItem: IDuongSu | null = null;
  selectedUnit: string = '';
  searchTerm: string = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  isEditing: boolean = false;
  total: number = 1;

  dsActions = [
    { icon: 'history', tooltip: 'Lịch sử cập nhật', type: 'history' },
    { icon: 'transaction', tooltip: 'Lịch sử giao dịch đương sự', type: 'historytrade' },
    { icon: 'alert', tooltip: 'Tình trạng ngăn chặn', type: 'containmentstatus' },
    { icon: 'plus', tooltip: 'Thêm mới thông tin ngăn chặn', type: 'addcontainmentstatus' },
    { icon: 'edit', tooltip: 'Chỉnh sửa thông tin đương sự', type: 'editinformation' },
    { icon: 'search', tooltip: 'Tra cứu thông tin vợ/chồng', type: 'spouseinformation' },
    { icon: 'plus', tooltip: 'Thêm thông tin vợ/chồng (Giấy CNKH)', type: 'addspouseinformation' },
    { icon: 'delete', tooltip: 'Xóa', type: 'delete' }
  ];

  isHistoryModalVisible = false;
  isHistoryTradeModalVisible = false;
  isContainmentStatusModalVisible = false;
  isAddContainmentStatusModalVisible = false;
  isSpouseInformationModalVisible = false;
  isAddSpouseInformationModalVisible = false;
  modalColumns: string[] = [];
  modalData: any[] = [];

  @ViewChild('duongSuForm') duongSuFormComponent: any; // Update the type based on the actual component type
  loaiDuongSuOptions: { label: string; value: string }[] = [];
  addContainmentStatusData: any;
  containmentStatusData: IChiTietNganChan[] = [];
  addSpouseInformationData: { idDuongSu: number; thongTinDs: string | null | undefined } = { idDuongSu: 0, thongTinDs: null };

  constructor(private duongSuService: DuongSuService,
              private modal: NzModalService,
              private loaiDuongSuService: LoaiDuongSuService,
              private thongTinCapNhatDuongSuService: ThongTinCapNhatDuongSuService,
              private notification: NzNotificationService,
              private chiTietNganChanService: ChiTietNganChanService) {}

  ngOnInit(): void {
    this.loadData();
    this.loadLoaiDuongSus();
  }

  loadData(): void {
    const queryParams = {
      page: this.pageIndex - 1, // API thường bắt đầu từ 0
      size: this.pageSize
    };

    this.duongSuService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  loadLoaiDuongSus(): void {
    this.loaiDuongSuService.query().subscribe({
      next: (res) => {
        this.loaiDuongSuOptions = res.body?.map(loaiDuongSu => ({
          label: loaiDuongSu.tenLoaiDuongSu || '',
          value: loaiDuongSu.idLoaiDuongSu
        })) || [];
      },
      error: (err) => console.error('Error fetching loai duong sus', err)
    });
  }

  getTenLoaiDuongSu(id: string | null): string {
    const found = this.loaiDuongSuOptions.find(option => option.value === id);
    return found ? found.label : 'N/A';
  }

  extractTinhTrangDuongSu(thongTinDs: string | null): string {
    if (!thongTinDs) {
      return 'Khác';
    }

    if (thongTinDs.includes('Sống')) {
      return 'Sống';
    }

    if (thongTinDs.includes('Đã chết')) {
      return 'Đã chết';
    }

    if (thongTinDs.includes('Bị ngăn chặn')) {
      return 'Bị ngăn chặn';
    }

    if (thongTinDs.includes('Đang hoạt động')) {
      return "Đang hoạt động";
    }

    if (thongTinDs.includes('Ngừng hoạt động')) {
      return "Ngừng hoạt động";
    }

    return 'Khác';
  }

  onUnitChange(): void {
    this.pageIndex = 1;
    const queryParams = {
      'loaiDuongSuId.equals': this.selectedUnit,
      page: this.pageIndex - 1,
      size: this.pageSize,
    };

    this.duongSuService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onSearchChange(): void {
    const queryParams = {
      'tenDuongSu.contains': this.searchValue,
      page: this.pageIndex - 1,
      size: this.pageSize,
    };

    this.duongSuService.query(queryParams).subscribe({
      next: (response) => {
        this.total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        this.listOfData = response.body || [];
      },
      error: (error) => console.error('Error fetching data:', error)
    });
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDuongSu[]): void {
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

  onFormDataUpdated(): void {
    this.loadData();
  }

  updateCurrentPageData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listOfCurrentPageData = this.listOfData.slice(startIndex, endIndex);
  }

  addNewItem(): void {
    this.isEditing = false;
    this.duongSuFormComponent.modalTitle = 'Thêm đương sự';
    this.duongSuFormComponent.showModal();
  }

  resetData(): void {
    this.loadData();
  }

  scan(): void {
    console.log('Scan action');
  }

  onActionClick(actionType: string, data: IDuongSu): void {
    switch (actionType) {
      case 'history':
        this.showHistoryModal(data);
        break;
      case 'historytrade':
        this.showHistoryTradeModal();
        break;
      case 'containmentstatus':
        this.showContainmentStatusModal(data);
        break;
      case 'addcontainmentstatus':
        this.showAddContainmentStatusModal(data);
        break;
      case 'spouseinformation':
        this.showSpouseInformationModal();
        break;
      case 'addspouseinformation':
        this.showAddSpouseInformationModal(data);
        break;
      case 'delete':
        this.showDeleteConfirm(data.idDuongSu);
        break;
      case 'editinformation':
        this.editDuongSu(data);
        break;
      default:
        console.error('Unknown action type:', actionType);
    }
  }

  editDuongSu(item: IDuongSu): void {
    this.selectedItem = item;
    this.isEditing = true;
    this.duongSuFormComponent.modalTitle = 'Cập nhật đương sự';
    this.duongSuFormComponent.showModal();
    this.duongSuFormComponent.loadItemData(item);
    this.duongSuFormComponent.selectedLoaiDuongSu = item.loaiDuongSu?.idLoaiDuongSu ?? null;
  }

  showHistoryModal(data: IDuongSu): void {
    const queryParams = {
      'duongSuId.equals': data.idDuongSu
    };

    this.thongTinCapNhatDuongSuService.query(queryParams).subscribe({
      next: (response) => {
        this.modalColumns = ['Tên đương sự', 'Loại đương sự', 'Số giấy tờ', 'Thông tin đương sự', 'Ngày cập nhật'];
        this.modalData = response.body?.map(item => ({
          'Tên đương sự': item.tenDuongSu || null,
          'Loại đương sự': this.getTenLoaiDuongSu(item.loaiDuongSu?.idLoaiDuongSu ?? null),
          'Số giấy tờ': item.soGiayTo || null,
          'Thông tin đương sự': item.thongTinDuongSu || null,
          'Ngày cập nhật': dayjs(item.ngayCapNhat).format('DD/MM/YYYY'),
        })) || [];
        this.isHistoryModalVisible = true;
      },
      error: (err) => {
        console.error('Lỗi khi lấy lịch sử cập nhật:', err);
      }
    });
  }

  showHistoryTradeModal(): void {
    this.isHistoryTradeModalVisible = true;
  }

  showContainmentStatusModal(data: IDuongSu): void {
    const queryParams = {
      'idDoiTuong.equals': data.idDuongSu,
      'loaiDoiTuong.equals': 1,
    };
    this.selectedItem = data;
    this.chiTietNganChanService.query(queryParams).subscribe({
      next: (response) => {
        this.containmentStatusData = response.body || []; // Lưu dữ liệu ngăn chặn
        this.isContainmentStatusModalVisible = true; // Hiển thị modal
      },
      error: () => {
        // Xử lý lỗi nếu cần
      }
    });
  }

  showAddContainmentStatusModal(data: IDuongSu): void {
    this.addContainmentStatusData = {
      idDoiTuong: data.idDuongSu,
      loaiDoiTuong: 1,
      loaiNganChan: undefined,
    };
    console.log('addContainmentStatusData:', this.addContainmentStatusData); // Log the data
    this.isAddContainmentStatusModalVisible = true;
  }

  showSpouseInformationModal(): void {
    this.isSpouseInformationModalVisible = true;
  }

  showAddSpouseInformationModal(data: IDuongSu): void {
    this.addSpouseInformationData = {
      idDuongSu: data.idDuongSu,
      thongTinDs: data.thongTinDs
    };
    this.isAddSpouseInformationModalVisible = true;
  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn có chắc chắn muốn xóa đương sự này?',
      nzOkText: 'Có',
      nzOkType: 'primary',
      nzCancelText: 'Không',
      nzMaskClosable: true,
      nzOnOk: () => this.deleteDuongSu(id)
    });
  }

// Phương thức xóa đương sự

  deleteDuongSu(id: number): void {
    this.duongSuService.delete(id).subscribe({
      next: () => {
        this.notification.success('Thông báo', 'Xóa đương sự thành công');
        // Cập nhật lại danh sách đương sự nếu cần
        this.loadData(); // Giả sử bạn có một phương thức để tải lại danh sách
      },
      error: (err) => {
        console.error('Error deleting duong su', err);
        this.notification.error('Thông báo', 'Xóa đương sự thất bại');
      }
    });
  }


  getHistoryDataFor(data: IThongTinCapNhatDuongSu): any[] {
    return [
      {
        'Tên đương sự': data.tenDuongSu || null,
        'Loại đương sự': this.getTenLoaiDuongSu(data.loaiDuongSu?.idLoaiDuongSu ?? null),
        'Số giấy tờ': data.soGiayTo || null,
        'Thông tin đương sự': data.thongTinDuongSu || null,
        'Ngày cập nhật': dayjs(data.ngayCapNhat).format('DD/MM/YYYY'),
      }
    ];
  }

  handleCancelModal(): void {
    this.isHistoryModalVisible = false;
    this.isHistoryTradeModalVisible = false;
    this.isContainmentStatusModalVisible = false;
    this.isAddContainmentStatusModalVisible = false;
    this.isSpouseInformationModalVisible = false;
    this.isAddSpouseInformationModalVisible = false;
  }

  parseThongTinDs(thongTinDs: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(thongTinDs, 'text/html');

    const getValue = (label: string) => {
      const element = Array.from(doc.querySelectorAll('b')).find(b => b.textContent?.includes(label));
      return element ? element.nextSibling?.textContent?.trim() || '' : '';
    };
    return {
      tinhTrangHonNhan: getValue('Tình trạng hôn nhân:')
    };
  }
}

