import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {DuongSuService} from "../../entities/duong-su/service/duong-su.service";
import {LoaiDuongSuService} from "../../entities/loai-duong-su/service/loai-duong-su.service";
import {IDuongSu, NewDuongSu} from "../../entities/duong-su/duong-su.model";
import {DanhMucTinhService} from "../../entities/danh-muc-tinh/service/danh-muc-tinh.service";
import {DanhMucHuyenService} from "../../entities/danh-muc-huyen/service/danh-muc-huyen.service";
import {DanhMucXaService} from "../../entities/danh-muc-xa/service/danh-muc-xa.service";
import {IDanhMucTinh} from "../../entities/danh-muc-tinh/danh-muc-tinh.model";
import {IDanhMucHuyen} from "../../entities/danh-muc-huyen/danh-muc-huyen.model";
import {IDanhMucXa} from "../../entities/danh-muc-xa/danh-muc-xa.model";
import {ILoaiDuongSu} from "../../entities/loai-duong-su/loai-duong-su.model";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ILoaiGiayTo} from "../../entities/loai-giay-to/loai-giay-to.model";
import {LoaiGiayToService} from "../../entities/loai-giay-to/service/loai-giay-to.service";
import dayjs from "dayjs/esm";
import {
  ThongTinCapNhatDuongSuService
} from "../../entities/thong-tin-cap-nhat-duong-su/service/thong-tin-cap-nhat-duong-su.service";
import {NewThongTinCapNhatDuongSu} from "../../entities/thong-tin-cap-nhat-duong-su/thong-tin-cap-nhat-duong-su.model";
@Component({
  selector: 'jhi-duongsu-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './duongsu-form.component.html',
  styleUrl: './duongsu-form.component.scss'
})
export class DuongsuFormComponent implements OnInit {
  isVisible = false;
  isGiayToKhacVisible: boolean = false;
  isGiayToKhacSpouseVisible: boolean = false;
  isGiayToKhacNguoiDaiDienVisible: boolean = false;
  isLoaiDuongSuReadonly = false;
  loaiDuongSuOptions: ILoaiDuongSu[] = [];
  loaiGiayToOptions: ILoaiGiayTo[] = [];

  @Input() modalTitle: string = '';
  @Input() isEditing: boolean = false;
  @Output() dataUpdated = new EventEmitter<void>();

  tinhs: IDanhMucTinh[] = [];
  huyens: IDanhMucHuyen[] = [];
  xas: IDanhMucXa[] = [];

  selectedLoaiGiayToCaNhan: string | null = null;
  selectedLoaiGiayToSpouse: string | null = null;
  selectedLoaiGiayToNguoiDaiDien: string | null = null;
  selectedLoaiDuongSu: string | null = 'ca_nhan';
  selectedtinhId: string | null = null;
  selectedhuyenId: string | null = null;
  selectedxaId: string | null = null;
  selectedtinhIdB: string | null = null;
  selectedhuyenIdB: string | null = null;
  selectedxaIdB: string | null = null;
  soNha: string | null = null;
  xaPhuong: string | null = null;
  quanHuyen: string | null = null;
  tinhThanhPho: string | null = null;

  // Dữ liệu của form
  newItem: IDuongSu = {
    idDuongSu: 0,
    tenDuongSu: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    fax: '',
    website: '',
    trangThai: null,
    thongTinDs: '',
    ngayThaoTac: dayjs(),
    nguoiThaoTac: null,
    idDsGoc: null,
    idMaster: '',
    idDonVi: null,
    strSearch: '',
    soGiayTo: '',
    ghiChu: '',
    idLoaiNganChan: null,
    syncStatus: null,
    loaiDuongSu: null, // Can be null or of type ILoaiDuongSu
    loaiGiayTo: null
  };

  secondPerson: IDuongSu = {
    idDuongSu: 0,
    tenDuongSu: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    fax: '',
    website: '',
    trangThai: null,
    thongTinDs: '',
    ngayThaoTac: dayjs(),
    nguoiThaoTac: null,
    idDsGoc: null,
    idMaster: '',
    idDonVi: null,
    strSearch: '',
    soGiayTo: '',
    ghiChu: '',
    idLoaiNganChan: null,
    syncStatus: null,
    loaiDuongSu: null,
    loaiGiayTo: null
  };

  giayChungNhanKetHon = {
    soGiayCNKH: '',
    ngayCap: null,
    noiCap: ''
  }

  thongTinKhacCaNhanA = {
    gioiTinh: '',
    ngaySinh: null as Date | null, // Định nghĩa rõ ràng kiểu
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null as Date | null, // Định nghĩa rõ ràng kiểu
      noiCap: ''
    },
    hoKhau: '',
    soNha: '',
    noiCuTruKhac: '',
    diaChiCuTruTamTru: '',
    quocTich: '',
    tinhTrangDuongSu: '',
    tinhTrangHonNhan: 'Chưa kết hôn'
  };


  thongTinKhacCaNhanB = {
    gioiTinh: '',
    ngaySinh: null as Date | null, // Định nghĩa rõ ràng kiểu
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null as Date | null, // Định nghĩa rõ ràng kiểu
      noiCap: ''
    },
    hoKhau: '',
    soNha: '',
    noiCuTruKhac: '',
    diaChiCuTruTamTru: '',
    quocTich: '',
    tinhTrangDuongSu: '',
    tinhTrangHonNhan: ''
  }

  thongTinKhacToChuc = {
    tenPhieu: '',
    truSo: '',
    giayPhepThanhLap: '',
    dangKyKinhDoanh: '',
    noiCapGiayPhep: '',
    xungHoNguoiDaiDien: '',
    hoTenNguoiDaiDien: '',
    chucVuNguoiDaiDien: '',
    ngaySinhNguoiDaiDien: null as Date | null,
    giayToTuyThan: {
      tenGiayTo: '',
      ngayCap: null as Date | null,
      noiCap: ''
    },
    hoKhauNguoiDaiDien: '',
    noiCuTruNguoiDaiDien: '',
    diaChiNguoiDaiDien: '',
    quocTichNguoiDaiDien: '',
    tinhTrangHoatDong: ''
  }

  constructor(
    private duongSuService: DuongSuService,
    private loaiDuongSuService: LoaiDuongSuService,
    private loaiGiayToService: LoaiGiayToService,
    private thongTinCapNhat: ThongTinCapNhatDuongSuService,
    protected danhMucTinhService: DanhMucTinhService,
    protected danhMucHuyenService: DanhMucHuyenService,
    protected danhMucXaService: DanhMucXaService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loadLoaiDuongSus();
    this.loadLoaiGiayTos();
    this.loadTinhs();
  }

  onLoaiGiayToChange(value: string, target: string): void {
    const selectedOption = this.loaiGiayToOptions.find(option => option.idLoaiGiayTo === value);

    if (target === 'caNhan') {
      this.isGiayToKhacVisible = (value === 'giay_to_khac');
      this.newItem.loaiGiayTo = selectedOption
        ? { idLoaiGiayTo: selectedOption.idLoaiGiayTo}
        : null;

      console.log('tenLoaiGiayTo caNhan:', selectedOption ? selectedOption.tenLoaiGiayTo : 'Không có loại giấy tờ nào được chọn');

    } else if (target === 'spouse') {
      this.isGiayToKhacSpouseVisible = (value === 'giay_to_khac');
      this.secondPerson.loaiGiayTo = selectedOption
        ? { idLoaiGiayTo: selectedOption.idLoaiGiayTo}
        : null;

      console.log('tenLoaiGiayTo spouse:', selectedOption ? selectedOption.tenLoaiGiayTo : 'Không có loại giấy tờ nào được chọn');

    } else if (target === 'nguoiDaiDien') {
      this.isGiayToKhacNguoiDaiDienVisible = (value === 'giay_to_khac');
      this.newItem.loaiGiayTo = selectedOption
        ? { idLoaiGiayTo: selectedOption.idLoaiGiayTo}
        : null;

      console.log('tenLoaiGiayTo nguoiDaiDien:', selectedOption ? selectedOption.tenLoaiGiayTo : 'Không có loại giấy tờ nào được chọn');
    }
  }

  onLoaiDuongSuChange(value: string) {
    const selectedLoaiDuongSu = this.loaiDuongSuOptions.find(option => option.idLoaiDuongSu === value);

    if (selectedLoaiDuongSu) {
      this.newItem.loaiDuongSu = {
        idLoaiDuongSu: selectedLoaiDuongSu.idLoaiDuongSu,
        tenLoaiDuongSu: selectedLoaiDuongSu.tenLoaiDuongSu
      } as ILoaiDuongSu;
      console.log('Loại đương sự đã gán:', this.newItem.loaiDuongSu);
    } else {
      this.newItem.loaiDuongSu = null;
    }
  }

  filterOption(input: string, option: any): boolean {
    return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }

  loadLoaiDuongSus(): void {
    this.loaiDuongSuService.query().subscribe({
      next: (res) => {
        this.loaiDuongSuOptions = res.body?.map(loaiDuongSu => ({
          tenLoaiDuongSu: loaiDuongSu.tenLoaiDuongSu || '',
          idLoaiDuongSu: loaiDuongSu.idLoaiDuongSu
        })) || [];
      },
      error: (err) => console.error('Error fetching loai duong sus', err)
    });
  }

  loadLoaiGiayTos(): void {
    this.loaiGiayToService.query().subscribe({
      next: (res) => {
        this.loaiGiayToOptions = res.body?.map(loaiGiayTo => ({
          tenLoaiGiayTo: loaiGiayTo.tenLoaiGiayTo || '',
          idLoaiGiayTo: loaiGiayTo.idLoaiGiayTo
        })) || [];
      },
      error: (err) => console.error('Error fetching loai giay tos', err)
    });
  }

  loadTinhs(): void {
    this.danhMucTinhService.query().subscribe({
      next: (res) => {
        this.tinhs = res.body || [];
      },
      error: (err) => console.error('Error fetching tinhs', err)
    });
  }

  ontinhChange(maTinh: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const queryParams = {
        'maTinh.equals': maTinh
      };

      this.danhMucHuyenService.query(queryParams).subscribe({
        next: (res) => {
          this.huyens = res.body || [];
          this.xas = []; // Reset xã khi tỉnh thay đổi
          this.selectedhuyenId = null; // Reset ID huyện khi tỉnh thay đổi
          this.selectedxaId = null; // Reset ID xã khi tỉnh thay đổi
          resolve();
        },
        error: (err: any) => {
          console.error('Error fetching huyens', err);
          reject();
        }
      });
    });
  }

  onhuyenChange(maHuyen: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const queryParams = {
        'maHuyen.equals': maHuyen
      };

      this.danhMucXaService.query(queryParams).subscribe({
        next: (res) => {
          this.xas = res.body || [];
          this.selectedxaId = null; // Reset ID xã khi huyện thay đổi
          resolve();
        },
        error: (err: any) => {
          console.error('Error fetching xas', err);
          reject();
        }
      });
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.generateThongTinDs(this.selectedLoaiDuongSu, this.newItem, this.secondPerson, this.thongTinKhacCaNhanA, this.thongTinKhacCaNhanB, this.thongTinKhacToChuc);
    const tinh = this.tinhs.find(t => t.maTinh === this.selectedtinhId)?.tenTinh || '';
    const huyen = this.huyens.find(h => h.maHuyen === this.selectedhuyenId)?.tenHuyen || '';
    const xa = this.xas.find(x => x.maXa === this.selectedxaId)?.tenXa || '';

    // Tạo địa chỉ cho cá nhân A
    this.newItem.diaChi = `${this.thongTinKhacCaNhanA.soNha ? this.thongTinKhacCaNhanA.soNha + ', ' : this.thongTinKhacToChuc.truSo ? this.thongTinKhacToChuc.truSo + ', ' : ''}${xa ? xa + ', ' : ''}${huyen ? huyen + ', ' : ''}${tinh ? tinh : ''}`;

    const newDuongSu = this.createDuongSu(this.newItem);
    let secondDuongSu: NewDuongSu | null = null;

    // Nếu loại đương sự là cá nhân và tình trạng hôn nhân là kết hôn
    if (this.selectedLoaiDuongSu === 'ca_nhan' && this.thongTinKhacCaNhanA.tinhTrangHonNhan === 'Kết hôn') {
      const tinhB = this.tinhs.find(t => t.maTinh === this.selectedtinhIdB)?.tenTinh || '';
      const huyenB = this.huyens.find(h => h.maHuyen === this.selectedhuyenIdB)?.tenHuyen || '';
      const xaB = this.xas.find(x => x.maXa === this.selectedxaIdB)?.tenXa || '';

      this.secondPerson.diaChi = `${this.thongTinKhacCaNhanB.soNha ? this.thongTinKhacCaNhanB.soNha + ', ' : ''}${xaB ? xaB + ', ' : ''}${huyenB ? huyenB + ', ' : ''}${tinhB ? tinhB : ''}`;
      secondDuongSu = this.createDuongSu(this.secondPerson);
    }

    // Gọi hàm lưu hoặc cập nhật đương sự
    if (this.isEditing) {
      this.updateDuongSu();
    } else {
      this.saveDuongSu(newDuongSu, secondDuongSu);
    }
  }

  createDuongSu(person: IDuongSu): NewDuongSu {
    return {
      ...person,
      idDuongSu: null, // Reset id để tạo mới
      thongTinDs: person.thongTinDs // Đã được gán trong generateThongTinDs
    };
  }

  saveDuongSu(newDuongSu: NewDuongSu, secondDuongSu: NewDuongSu | null): void {
    this.duongSuService.create(newDuongSu).subscribe({
      next: (response) => {
        console.log('Tạo đương sự thành công:', response);
        this.notification.success('Thành công', 'Tạo đương sự thành công');

        this.isVisible = false;
        this.dataUpdated.emit();

        if (secondDuongSu) {
          this.duongSuService.create(secondDuongSu).subscribe({
            next: (response) => {
              console.log('Tạo đương sự thứ hai thành công:', response);
              this.notification.success('Thành công', 'Tạo đương sự thứ hai thành công');
            },
            error: (err) => {
              console.error('Lỗi khi tạo đương sự thứ hai:', err);
              this.notification.error('Thất bại', 'Lỗi khi tạo đương sự thứ hai');
            }
          });
        }
      },
      error: (err) => {
        console.error('Lỗi khi tạo đương sự:', err);
        this.notification.error('Thất bại', 'Lỗi khi tạo đương sự');
      }
    });
  }

  updateDuongSu(): void {
    // Đảm bảo newItem có idDuongSu hợp lệ
    if (this.newItem.idDuongSu !== null && this.newItem.idDuongSu !== 0) {
      this.duongSuService.update(this.newItem).subscribe({
        next: (response) => {
          console.log('Cập nhật đương sự thành công:', response);
          this.notification.success('Thành công', 'Cập nhật đương sự thành công');

          const thongTinCapNhat: NewThongTinCapNhatDuongSu = {
            idCapNhat: null,
            tenDuongSu: this.newItem.tenDuongSu,
            soGiayTo: this.newItem.soGiayTo,
            thongTinDuongSu: this.newItem.thongTinDs,
            ngayCapNhat: dayjs(),
            loaiDuongSu: this.newItem.loaiDuongSu,
            loaiGiayTo: this.newItem.loaiGiayTo,
            duongSu: { idDuongSu: this.newItem.idDuongSu },
          };

          this.thongTinCapNhat.create(thongTinCapNhat).subscribe({
            next: (updateResponse) => {
              console.log('Lưu thông tin cập nhật thành công:', updateResponse);
            },
            error: (err) => {
              console.error('Lỗi khi lưu thông tin cập nhật:', err);
            }
          });

          this.isVisible = false;
          this.dataUpdated.emit();

          if (this.secondPerson && this.secondPerson.idDuongSu !== null && this.secondPerson.idDuongSu !== 0) {
            this.duongSuService.update(this.secondPerson).subscribe({
              next: (response) => {
                console.log('Cập nhật đương sự thứ hai thành công:', response);
                this.notification.success('Thành công', 'Cập nhật đương sự thứ hai thành công');
              },
              error: (err) => {
                console.error('Lỗi khi cập nhật đương sự thứ hai:', err);
                this.notification.error('Thất bại', 'Lỗi khi cập nhật đương sự thứ hai');
              }
            });
          }
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật đương sự:', err);
          this.notification.error('Thất bại', 'Lỗi khi cập nhật đương sự');
        }
      });
    } else {
      this.notification.error('Thất bại', 'ID đương sự không hợp lệ');
    }
  }

  generateThongTinDs(
    loaiDuongSu: string | null,
    newItem: IDuongSu,
    secondPerson: IDuongSu | null,
    thongTinKhacCaNhanA: any,
    thongTinKhacCaNhanB: any | null,
    thongTinKhacToChuc: any
  ): void {
    let thongTinA = '';
    let thongTinB = '';
    let thongTinToChuc = '';

    if (loaiDuongSu === 'ca_nhan') {
      // Thông tin cá nhân A
      thongTinA =
        `<b>Giới tính: </b>${thongTinKhacCaNhanA.gioiTinh || ''}` +
        `<br/><b>Ngày sinh: </b>${this.formatDate(thongTinKhacCaNhanA.ngaySinh) || ''}` +
        `<br/><b>Ngày cấp giấy tờ tùy thân: </b>${this.formatDate(thongTinKhacCaNhanA.giayToTuyThan?.ngayCap) || ''}` +
        `<br/><b>Nơi cấp giấy tờ tùy thân: </b>${thongTinKhacCaNhanA.giayToTuyThan?.noiCap || ''}` +
        `<br/><b>Hộ khẩu: </b>${thongTinKhacCaNhanA.hoKhau || ''}` +
        `<br/><b>Số nhà: </b>${thongTinKhacCaNhanA.soNha || ''}` +
        `<br/><b>Nơi cư trú khác: </b>${thongTinKhacCaNhanA.noiCuTruKhac || ''}` +
        `<br/><b>Địa chỉ cư trú/tạm trú: </b>${thongTinKhacCaNhanA.diaChiCuTruTamTru || ''}` +
        `<br/><b>Quốc tịch: </b>${thongTinKhacCaNhanA.quocTich || ''}` +
        `<br/><b>Tình trạng đương sự: </b>${thongTinKhacCaNhanA.tinhTrangDuongSu || ''}` +
        `<br/><b>Tình trạng hôn nhân: </b>${thongTinKhacCaNhanA.tinhTrangHonNhan || ''}`;

      // Gán thông tin cho newItem (cá nhân A)
      newItem.thongTinDs = thongTinA;

      // Thông tin cá nhân B (nếu có)
      if (secondPerson && thongTinKhacCaNhanB) {
        thongTinB =
          `<b>Giới tính: </b>${thongTinKhacCaNhanB.gioiTinh || ''}` +
          `<br/><b>Ngày sinh: </b>${this.formatDate(thongTinKhacCaNhanB.ngaySinh) || ''}` +
          `<br/><b>Ngày cấp giấy tờ tùy thân: </b>${this.formatDate(thongTinKhacCaNhanB.giayToTuyThan?.ngayCap) || ''}` +
          `<br/><b>Nơi cấp giấy tờ tùy thân: </b>${thongTinKhacCaNhanB.giayToTuyThan?.noiCap || ''}` +
          `<br/><b>Hộ khẩu: </b>${thongTinKhacCaNhanB.hoKhau || ''}` +
          `<br/><b>Số nhà: </b>${thongTinKhacCaNhanB.soNha || ''}` +
          `<br/><b>Nơi cư trú khác: </b>${thongTinKhacCaNhanB.noiCuTruKhac || ''}` +
          `<br/><b>Địa chỉ cư trú/tạm trú: </b>${thongTinKhacCaNhanB.diaChiCuTruTamTru || ''}` +
          `<br/><b>Quốc tịch: </b>${thongTinKhacCaNhanB.quocTich || ''}` +
          `<br/><b>Tình trạng đương sự: </b>${thongTinKhacCaNhanB.tinhTrangDuongSu || ''}` +
          `<br/><b>Tình trạng hôn nhân: </b>${thongTinKhacCaNhanB.tinhTrangHonNhan || ''}`;
        secondPerson.thongTinDs = thongTinB;
      }

    } else if (loaiDuongSu === 'to_chuc' || loaiDuongSu === 'to_chuc_tin_dung') {
      // Xử lý thông tin tổ chức (nếu có)
        thongTinToChuc =
          `<b>Tên công ty: </b>${newItem.tenDuongSu || ''}` +
          `<br/><b>Tên phiếu: </b>${thongTinKhacToChuc.tenPhieu || ''}` +
          `<br/><b>Trụ sở: </b>${thongTinKhacToChuc.truSo || ''}` +
          `<br/><b>Giấy phép thành lập: </b>${thongTinKhacToChuc.giayPhepThanhLap || ''}` +
          `<br/><b>Đăng ký kinh doanh: </b>${thongTinKhacToChuc.dangKyKinhDoanh || ''}` +
          `<br/><b>Nơi cấp giấy phép: </b>${thongTinKhacToChuc.noiCapGiayPhep || ''}` +
          `<br/><b>Xưng hô người đại diện: </b>${thongTinKhacToChuc.xungHoNguoiDaiDien || ''}` + // Thêm trường này
          `<br/><b>Họ tên người đại diện: </b>${thongTinKhacToChuc.hoTenNguoiDaiDien || ''}` +
          `<br/><b>Chức vụ người đại diện: </b>${thongTinKhacToChuc.chucVuNguoiDaiDien || ''}` +
          `<br/><b>Tên giấy tờ tùy thân người đại diện: </b>${thongTinKhacToChuc.giayToTuyThan.tenGiayTo || ''}` +
          `<br/><b>Số giấy tờ tùy thân người đại diện: </b>${newItem.soGiayTo || ''}` +
          `<br/><b>Cơ quan cấp giấy tờ tùy thân: </b>${thongTinKhacToChuc.giayToTuyThan.noiCap || ''}` +
          `<br/><b>Ngày cấp giấy tờ tùy thân: </b>${this.formatDate(thongTinKhacToChuc.giayToTuyThan.ngayCap) || ''}` +
          `<br/><b>Hộ khẩu thường trú: </b>${thongTinKhacToChuc.hoKhauNguoiDaiDien || ''}` +
          `<br/><b>Nơi cư trú người đại diện: </b>${thongTinKhacToChuc.noiCuTruNguoiDaiDien || ''}` +
          `<br/><b>Địa chỉ người đại diện: </b>${thongTinKhacToChuc.diaChiNguoiDaiDien || ''}` + //
          `<br/><b>Quốc tịch người đại diện: </b>${thongTinKhacToChuc.quocTichNguoiDaiDien || ''}` +
          `<br/><b>Tình trạng hoạt động: </b>${thongTinKhacToChuc.tinhTrangHoatDong || ''}` +
          `<br/><b>Ngày sinh người đại diện: </b>${this.formatDate(thongTinKhacToChuc.ngaySinhNguoiDaiDien) || ''}`;
      newItem.thongTinDs = thongTinToChuc;
    }
  }

  private formatDate(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  loadItemData(item: IDuongSu): void {
    this.newItem = { ...item }; // Populate the form with the data

    // Gán thông tin cá nhân A
    this.thongTinKhacCaNhanA = this.parseThongTinDs(item.thongTinDs || '');

    // Gán thông tin cá nhân B (nếu có)
    if (this.secondPerson) {
      this.thongTinKhacCaNhanB = this.parseThongTinDs(this.secondPerson.thongTinDs || '');
    }

    // Gán thông tin tổ chức (nếu có)
    if (item.loaiDuongSu?.idLoaiDuongSu === 'to_chuc' || item.loaiDuongSu?.idLoaiDuongSu === 'to_chuc_tin_dung') {
      this.thongTinKhacToChuc = this.parseThongTinToChuc(item.thongTinDs || '');
    }

    this.selectedLoaiGiayToCaNhan = item.loaiGiayTo?.idLoaiGiayTo || null;
    this.selectedLoaiGiayToSpouse = this.secondPerson.loaiGiayTo?.idLoaiGiayTo || null;
    this.selectedLoaiGiayToNguoiDaiDien = item.loaiGiayTo?.idLoaiGiayTo || null;

    this.extractAddressParts(); // If needed for address handling

    // Set selected IDs based on extracted address
    this.selectedtinhId = this.tinhs.find(t => t.tenTinh === this.tinhThanhPho)?.maTinh || null;

    if (this.selectedtinhId) {
      this.ontinhChange(this.selectedtinhId)
        .then(() => {
          this.selectedhuyenId = this.huyens.find(h => h.tenHuyen === this.quanHuyen)?.maHuyen || null;
          if (this.selectedhuyenId) {
            return this.onhuyenChange(this.selectedhuyenId); // Return promise for huyen change
          }
          return Promise.resolve(); // Resolve immediately if no huyenId
        })
        .then(() => {
          this.selectedxaId = this.xas.find(x => x.tenXa === this.xaPhuong)?.maXa || null;
        })
        .catch(() => {
        });
    } else {
    }
  }

  private parseThongTinDs(thongTinDs: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(thongTinDs, 'text/html');

    const getValue = (label: string) => {
      const element = Array.from(doc.querySelectorAll('b')).find(b => b.textContent?.includes(label));
      return element ? element.nextSibling?.textContent?.trim() || '' : '';
    };

    const ngaySinhStr = getValue('Ngày sinh:');
    const ngayCapStr = getValue('Ngày cấp giấy tờ tùy thân:');

    return {
      gioiTinh: getValue('Giới tính:'),
      ngaySinh: ngaySinhStr ? new Date(ngaySinhStr) : null, // Thay đổi thành Date
      giayToTuyThan: {
        tenGiayTo: getValue('Tên giấy tờ tùy thân:'),
        ngayCap: ngayCapStr ? new Date(ngayCapStr) : null, // Thay đổi thành Date
        noiCap: getValue('Nơi cấp giấy tờ tùy thân:')
      },
      hoKhau: getValue('Hộ khẩu:'),
      soNha: getValue('Số nhà:'),
      noiCuTruKhac: getValue('Nơi cư trú khác:'),
      diaChiCuTruTamTru: getValue('Địa chỉ cư trú/tạm trú:'),
      quocTich: getValue('Quốc tịch:'),
      tinhTrangDuongSu: getValue('Tình trạng đương sự:'),
      tinhTrangHonNhan: getValue('Tình trạng hôn nhân:')
    };
  }

  private parseThongTinToChuc(thongTinDs: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(thongTinDs, 'text/html');

    const getValue = (label: string) => {
      const element = Array.from(doc.querySelectorAll('b')).find(b => b.textContent?.includes(label));
      return element ? element.nextSibling?.textContent?.trim() || '' : '';
    };

    const ngaySinhNguoiDaiDienStr = getValue('Ngày sinh người đại diện:');
    const ngayCapStr = getValue('Ngày cấp giấy tờ tùy thân:');

    return {
      tenDuongSu: getValue('Tên công ty:'),
      tenPhieu: getValue('Tên phiếu:'),
      truSo: getValue('Trụ sở:'),
      giayPhepThanhLap: getValue('Giấy phép thành lập:'),
      dangKyKinhDoanh: getValue('Đăng ký kinh doanh:'),
      noiCapGiayPhep: getValue('Nơi cấp giấy phép:'),
      xungHoNguoiDaiDien: getValue('Xưng hô người đại diện:'),
      hoTenNguoiDaiDien: getValue('Họ tên người đại diện:'),
      chucVuNguoiDaiDien: getValue('Chức vụ người đại diện:'),
      giayToTuyThan: {
        tenGiayTo: getValue('Tên giấy tờ tùy thân người đại diện:'),
        ngayCap: ngayCapStr ? new Date(ngayCapStr) : null, // Thay đổi thành Date
        noiCap: getValue('Cơ quan cấp giấy tờ tùy thân:')
      },
      hoKhauNguoiDaiDien: getValue('Hộ khẩu thường trú:'),
      noiCuTruNguoiDaiDien: getValue('Nơi cư trú người đại diện:'),
      diaChiNguoiDaiDien: getValue('Địa chỉ người đại diện:'),
      quocTichNguoiDaiDien: getValue('Quốc tịch người đại diện:'),
      tinhTrangHoatDong: getValue('Tình trạng hoạt động:'),
      ngaySinhNguoiDaiDien: ngaySinhNguoiDaiDienStr ? new Date(ngaySinhNguoiDaiDienStr) : null // Thay đổi thành Date
    };
  }

  extractAddressParts(): void {
    if (this.newItem.diaChi) {
      const addressParts = this.newItem.diaChi.split(',').map(part => part.trim());
      if (addressParts.length === 4) {
        this.soNha = addressParts[0];
        this.xaPhuong = addressParts[1];
        this.quanHuyen = addressParts[2];
        this.tinhThanhPho = addressParts[3];
      } else if (addressParts.length === 3) {
        this.soNha = null;
        this.xaPhuong = addressParts[0];
        this.quanHuyen = addressParts[1];
        this.tinhThanhPho = addressParts[2];
      }
    } else {
      this.soNha = null;
      this.xaPhuong = null;
      this.quanHuyen = null;
      this.tinhThanhPho = null;
    }
  }

  private resetForm(): void {
    this.selectedtinhId = null;
    this.selectedhuyenId = null;
    this.selectedxaId = null;

    this.newItem = {
      idDuongSu: 0,
      tenDuongSu: '',
      diaChi: '',
      soDienThoai: '',
      email: '',
      fax: '',
      website: '',
      trangThai: null,
      thongTinDs: '',
      ngayThaoTac: dayjs(),
      nguoiThaoTac: null,
      idDsGoc: null,
      idMaster: '',
      idDonVi: null,
      strSearch: '',
      soGiayTo: '',
      ghiChu: '',
      idLoaiNganChan: null,
      syncStatus: null,
      loaiDuongSu: {
        idLoaiDuongSu: 'ca_nhan'
      },
      loaiGiayTo: null
    };

    this.secondPerson = {
      idDuongSu: 0, // Nếu cần
      tenDuongSu: '',
      diaChi: '',
      soDienThoai: '',
      email: '',
      fax: '',
      website: '',
      trangThai: null,
      thongTinDs: '',
      ngayThaoTac: dayjs(),
      nguoiThaoTac: null,
      idDsGoc: null,
      idMaster: '',
      idDonVi: null,
      strSearch: '',
      soGiayTo: '',
      ghiChu: '',
      idLoaiNganChan: null,
      syncStatus: null,
      loaiDuongSu: {
        idLoaiDuongSu: 'ca_nhan'
      },
      loaiGiayTo: null
    }

    this.giayChungNhanKetHon = {
      soGiayCNKH: '',
      ngayCap: null,
      noiCap: ''
    }

    this.thongTinKhacCaNhanA = {
      gioiTinh: '',
      ngaySinh: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhau: '',
      soNha: '',
      noiCuTruKhac: '',
      diaChiCuTruTamTru: '',
      quocTich: '',
      tinhTrangDuongSu: '',
      tinhTrangHonNhan: ''
    }

    this.thongTinKhacCaNhanB = {
      gioiTinh: '',
      ngaySinh: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhau: '',
      soNha: '',
      noiCuTruKhac: '',
      diaChiCuTruTamTru: '',
      quocTich: '',
      tinhTrangDuongSu: '',
      tinhTrangHonNhan: ''
    }

    this.thongTinKhacToChuc = {
      tenPhieu: '',
      truSo: '',
      giayPhepThanhLap: '',
      dangKyKinhDoanh: '',
      noiCapGiayPhep: '',
      xungHoNguoiDaiDien: '',
      hoTenNguoiDaiDien: '',
      chucVuNguoiDaiDien: '',
      ngaySinhNguoiDaiDien: null,
      giayToTuyThan: {
        tenGiayTo: '',
        ngayCap: null,
        noiCap: ''
      },
      hoKhauNguoiDaiDien: '',
      noiCuTruNguoiDaiDien: '',
      diaChiNguoiDaiDien: '',
      quocTichNguoiDaiDien: '',
      tinhTrangHoatDong: ''
    }
  }
}
