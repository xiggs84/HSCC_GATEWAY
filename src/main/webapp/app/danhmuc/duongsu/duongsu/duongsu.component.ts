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

@Component({
  selector: 'jhi-duongsu',
  standalone: true,
  imports: [SharedModule, DuongsuFormComponent, LichsucapnhatComponent, LichsugiaodichduongsuComponent, TinhtrangnganchanComponent, ThemthongtinnganchanComponent, ThongtinvochongComponent, ThemthongtinvochongComponent],
  templateUrl: './duongsu.component.html',
  styleUrl: './duongsu.component.scss'
})
export class DuongsuComponent implements OnInit {
  listOfData: readonly IDuongSu[] = []; // Thay đổi thành kiểu readonly
  searchValue: string = '';
  listOfCurrentPageData: readonly IDuongSu[] = []; // Thay đổi thành kiểu readonly
  selectedUnit: string = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  originalData: readonly IDuongSu[] = []; // Thay đổi thành kiểu readonly

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

  constructor(private duongsuService: DuongSuService,
              private modal: NzModalService,
              private loaiDuongSuService: LoaiDuongSuService) {}

  ngOnInit(): void {
    this.loadDuongsuData();
    this.loadLoaiDuongSus();
  }

  loadDuongsuData(): void {
    this.duongsuService.query().subscribe({
      next: (response) => {
        this.originalData = response.body || [];
        this.listOfData = [...this.originalData];
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

    return 'Khác';
  }


  getLoaiDuongSuLabel(loaiDuongSuKey: keyof typeof LoaiDuongSu): string {
    return LoaiDuongSu[loaiDuongSuKey] || '';
  }

  onUnitChange(): void {
  }

  onSearchChange(): void {
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly IDuongSu[]): void { // Cập nhật kiểu dữ liệu tham số
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updateCurrentPageData(); // Cập nhật dữ liệu trang hiện tại
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1; // Reset to first page when page size changes
    this.updateCurrentPageData(); // Cập nhật dữ liệu trang hiện tại
  }

  updateCurrentPageData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.listOfCurrentPageData = this.listOfData.slice(startIndex, endIndex);
  }

  resetData(): void {
    this.loadDuongsuData();
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
        this.showContainmentStatusModal();
        break;
      case 'addcontainmentstatus':
        this.showAddContainmentStatusModal();
        break;
      case 'spouseinformation':
        this.showSpouseInformationModal();
        break;
      case 'addspouseinformation':
        this.showAddSpouseInformationModal();
        break;
      case 'delete':
        this.showDeleteConfirm();
        break;
      case 'editinformation':
        this.editDuongSu(data);
        break;
      default:
        console.error('Unknown action type:', actionType);
    }
  }

  editDuongSu(data: IDuongSu): void {
    // Chỉnh sửa đương sự
  }

  showHistoryModal(data: IDuongSu): void {
    this.modalColumns = ['Tên đương sự', 'Loại đương sự', 'Số giấy tờ', 'Thông tin đương sự', 'Ngày cập nhật'];
    this.modalData = this.getHistoryDataFor(data);
    this.isHistoryModalVisible = true;
  }

  showHistoryTradeModal(): void {
    this.isHistoryTradeModalVisible = true;
  }

  showContainmentStatusModal(): void {
    this.isContainmentStatusModalVisible = true;
  }

  showAddContainmentStatusModal(): void {
    this.isAddContainmentStatusModalVisible = true;
  }

  showSpouseInformationModal(): void {
    this.isSpouseInformationModalVisible = true;
  }

  showAddSpouseInformationModal(): void {
    this.isAddSpouseInformationModalVisible = true;
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa?',
      nzContent: 'Hành động này không thể hoàn tác.',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        console.log('Xóa thành công');
      }
    });
  }

  getHistoryDataFor(data: IDuongSu): any[] {
    return [
      {
        'Tên đương sự': data.tenDuongSu || 'Nguyen Van A',
        'Loại đương sự': data.loaiDuongSu,
        'Số giấy tờ': data.soGiayTo || '123456789',
        'Thông tin đương sự': data.thongTinDs || 'Thông tin chi tiết',
        'Ngày cập nhật': new Date()
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
}

