import { Component, ViewChild } from '@angular/core';
import SharedModule from "../../../shared/shared.module";
import {DuongSuService} from "../../../entities/duong-su/service/duong-su.service";
import {LoaiDuongSu} from "../../../entities/enumerations/loai-duong-su.model";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { DuongsuFormComponent } from "../../../form/duongsu-form/duongsu-form.component";
import {LichsucapnhatComponent} from "../../../thaotac/lichsucapnhat/lichsucapnhat.component";
import {LichsugiaodichduongsuComponent} from "../../../thaotac/lichsugiaodichduongsu/lichsugiaodichduongsu.component";
import {TinhtrangnganchanComponent} from "../../../thaotac/tinhtrangnganchan/tinhtrangnganchan.component";
import {ThemthongtinnganchanComponent} from "../../../thaotac/themthongtinnganchan/themthongtinnganchan.component";
import {ThongtinvochongComponent} from "../../../thaotac/thongtinvochong/thongtinvochong.component";
import {ThemthongtinvochongComponent} from "../../../thaotac/themthongtinvochong/themthongtinvochong.component";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'jhi-duongsu',
  standalone: true,
  imports: [SharedModule, DuongsuFormComponent, LichsucapnhatComponent, LichsugiaodichduongsuComponent, TinhtrangnganchanComponent, ThemthongtinnganchanComponent, ThongtinvochongComponent, ThemthongtinvochongComponent],
  templateUrl: './duongsu.component.html',
  styleUrl: './duongsu.component.scss'
})
export class DuongsuComponent {
  selectedUnit: string = '';
  searchValue: string = '';
  listOfDs: any[] = [];
  filteredListOfDs: any[] = [];
  selectedDuongSuData: any;
  @ViewChild(DuongsuFormComponent) duongSuFormComponent!: DuongsuFormComponent;

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

  onActionClick(actionType: string, data: any): void {
    if (actionType === 'history') {
      this.showHistoryModal(data);
    } else if (actionType === 'historytrade') {
      this.showHistoryTradeModal();
    } else if (actionType === 'containmentstatus') {
      this.showContainmentStatusModal();
    } else if (actionType === 'addcontainmentstatus') {
      this.showAddContainmentStatusModal();
    } else if (actionType === 'spouseinformation') {
      this.showSpouseInformationModal();
    } else if (actionType === 'addspouseinformation') {
      this.showAddSpouseInformationModal();
    } else if (actionType === 'delete') {
      this.showDeleteConfirm();
    } else if (actionType === 'editinformation') {
      this.editDuongSu(data);
    }
    // Handle other actions...
  }

  editDuongSu(data: any): void {
    this.duongsuService.findBySoGiayTo(data.soGiayTo).subscribe({
      next: (response) => {
        this.selectedDuongSuData = response.body;
        if (this.duongSuFormComponent) {
          this.duongSuFormComponent.populateForm(this.selectedDuongSuData, true); // Truyền dữ liệu vào form
          this.duongSuFormComponent.showModal(); // Hiển thị form
        } else {
          console.error('duongSuFormComponent chưa sẵn sàng');
        }
      },
      error: (error) => {
        // Handle error
      },
      complete: () => {
        // Handle complete
      }
    });
  }


  showHistoryModal(data: any): void {
    this.modalColumns = ['Tên đương sự', 'Loại đương sự', 'Số giấy tờ', 'Thông tin đương sự', 'Ngày cập nhật'];
    this.modalData = this.getHistoryDataFor(data);
    this.isHistoryModalVisible = true;
  }

  showHistoryTradeModal() {
    this.isHistoryTradeModalVisible = true;
  }

  showContainmentStatusModal() {
    this.isContainmentStatusModalVisible = true;
  }

  showAddContainmentStatusModal() {
    this.isAddContainmentStatusModalVisible = true;
  }

  showSpouseInformationModal() {
    this.isSpouseInformationModalVisible = true;
  }

  showAddSpouseInformationModal() {
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
        // Thực hiện hành động xóa ở đây
        console.log('Xóa thành công');
      }
    });
  }

  getHistoryDataFor(data: any): any[] {
    // Fetch or generate history data based on the provided data
    return [
      // Example data
      {
        'Tên đương sự': 'Nguyen Van A',
        'Loại đương sự': 'Cá nhân',
        'Số giấy tờ': '123456789',
        'Thông tin đương sự': 'Thông tin chi tiết',
        'Ngày cập nhật': new Date()
      }
      // More data...
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

  constructor(private duongsuService: DuongSuService,
              private modal: NzModalService) {}

  ngOnInit(): void {
    this.loadDuongsuData();
  }

  loadDuongsuData(): void {
    this.duongsuService.query().pipe(
      tap(response => {
        this.listOfDs = this.mapData(response.body || []); // Use response.body to get the actual data
        this.filterDataByType();
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(() => new Error('Error fetching data'));
      })
    ).subscribe();
  }

  mapData(data: any[]): any[] {
    return data.map(item => ({
      idDuongSu: item.idDuongSu,
      soGiayTo: item.soGiayTo || '',
      tenDuongSu: item.tenDuongSu || '',
      loaiDuongSu: item.loaiDuongSu ? this.getLoaiDuongSuLabel(item.loaiDuongSu) : '',
      tinhTrangDuongSu: this.extractTinhTrangDuongSu(item.thongTinDs) || '', // Chuyển đổi nếu cần
      diaChi: item.diaChi || '',
      donVi: item.donVi || ''
    }));
  }

  getLoaiDuongSuLabel(loaiDuongSuKey: keyof typeof LoaiDuongSu): string {
    return LoaiDuongSu[loaiDuongSuKey] || '';
  }

  extractTinhTrangDuongSu(thongTinDs: string): string {
    // Thay đổi theo cách bạn muốn trích xuất tình trạng đương sự từ `thongTinDs`
    // Ví dụ:
    return thongTinDs.includes('ChuaKetHon') ? 'ChuaKetHon' : 'Khac';
  }

  resetData() {
    this.loadDuongsuData();
  }

  scan() {
    console.log('Scan action');
  }

  filterDataByType(): void {
    let filteredByType = this.selectedUnit === 'all' || !this.selectedUnit
      ? this.listOfDs
      : this.listOfDs.filter(ds => ds.loaiDuongSu === this.selectedUnit);

    if (this.searchValue) {
      this.filteredListOfDs = filteredByType.filter(ds =>
        ds.tenDuongSu.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        ds.soGiayTo.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.filteredListOfDs = filteredByType;
    }
  }

  onUnitChange(): void {
    this.filterDataByType();
  }

  onSearchChange(): void {
    this.filterDataByType();
  }

  protected readonly LoaiDuongSu = LoaiDuongSu;
}
