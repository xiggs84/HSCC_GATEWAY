import {Component, EventEmitter, Input, Output} from '@angular/core';
import SharedModule from '../../shared/shared.module';
import {ITaiSan, NewTaiSan} from "../../entities/tai-san/tai-san.model";
import {IDanhMucLoaiTaiSan} from "../../entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model";
import {TaiSanService} from "../../entities/tai-san/service/tai-san.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import dayjs from "dayjs/esm";
import {DanhMucTinhService} from "../../entities/danh-muc-tinh/service/danh-muc-tinh.service";
import {DanhMucHuyenService} from "../../entities/danh-muc-huyen/service/danh-muc-huyen.service";
import {DanhMucXaService} from "../../entities/danh-muc-xa/service/danh-muc-xa.service";
import {IDanhMucTinh} from "../../entities/danh-muc-tinh/danh-muc-tinh.model";
import {IDanhMucHuyen} from "../../entities/danh-muc-huyen/danh-muc-huyen.model";
import {IDanhMucXa} from "../../entities/danh-muc-xa/danh-muc-xa.model";
import {NewThongTinCapNhatTaiSan} from "../../entities/thong-tin-cap-nhat-tai-san/thong-tin-cap-nhat-tai-san.model";
import {
  ThongTinCapNhatTaiSanService
} from "../../entities/thong-tin-cap-nhat-tai-san/service/thong-tin-cap-nhat-tai-san.service";

@Component({
  selector: 'jhi-taisan-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './taisan-form.component.html',
  styleUrl: './taisan-form.component.scss'
})
export class TaisanFormComponent {
  isVisible = false;
  @Input() isEditing!: any;
  @Input() modalTitle: string = '';
  @Output() dataUpdated = new EventEmitter<unknown>();
  selectedLoaiTaiSan: any;
  selectedSoHuuTheo: number | null = null;
  selectedLoaiGiayTo: string | null = null;
  isGiayToKhacVisible: boolean = false;

  newItem: ITaiSan = {
    danhMucLoaiTaiSan: undefined,
    ghiChu: undefined,
    idDonVi: undefined,
    idDuongSu: undefined,
    idLoaiNganChan: undefined,
    idMaster: undefined,
    idTaiSan: 0,
    idTsGoc: undefined,
    loaiNganChan: undefined,
    maTaiSan: undefined,
    moTa: undefined,
    ngayBdNganChan: undefined,
    ngayKtNganChan: undefined,
    ngayThaoTac: undefined,
    nguoiThaoTac: undefined,
    soCc: undefined,
    soHsCv: undefined,
    soVaoSo: undefined,
    strSearch: undefined,
    syncStatus: undefined,
    tenTaiSan: undefined,
    thongTinTs: undefined,
    tinhTrangTaiSan: undefined,
    trangThai: undefined
  }

  thongTinTaiSan: any = {
    diaChiThuaDat: undefined,
    thuaDatSo: undefined,
    toBanDoSo: undefined,
    dienTich: undefined,
    soHuuTheo: undefined,
    hangDat: undefined,
    datCoTaiSanGanLien: {
      loaiCongTrinh: undefined,
      tongDienTichSD: undefined,
      hinhThucSD: undefined,
      mucDichSD: undefined,
      thoiHanSD: undefined,
      thoiHanSDConLai: undefined,
      nguonGocThuaDat: undefined,
      loaiNhaO: undefined,
      diaChiNha: undefined,
      dienTichXayDung: undefined,
      dienTichSan: undefined,
      capNha: undefined,
      soTang: undefined,
      ketCau: undefined,
      namHoanThanhXayDung: undefined,
    },
    datKhongCoTaiSanGanLien: {
      mucDichSD: undefined,
      thoiHanSD: undefined,
      hinhThucSD: undefined,
      nguonGocSD: undefined,
      ghiChu: undefined,
    },
    giayChungNhanQuyenSoHuuNhaO: {
      diaChi: undefined,
      tongDienTichSuDung: undefined,
      dienTichSan: undefined,
      ketCau: undefined,
      soTang: undefined,
      loaiDat: undefined,
      thoiHanSD: undefined,
      hinhThucSuDungChung: undefined,
      hinhThucSuDungRieng: undefined,
      mucDichSuDungDat: undefined,
      nguonGocThuaDat: undefined,
      ghiChu: undefined,
    },
    oTo: {
      bienKiemSoat: undefined,
      nhanHieu: undefined,
      loaiXe: undefined,
      mauSon: undefined,
      soMay: undefined,
      soKhung: undefined,
      soChoNgoi: undefined,
      giayDangKyXeSo: undefined,
      ngayCap: undefined,
      noiCap: undefined,
      ghiChu: undefined
    },
    phuongTienThuyNoiDia: {
      tenPhuongTien: undefined,
      soDangKy: undefined,
      loaiPhuongTien: undefined,
      chuPhuongTien: undefined,
      diaChiChuPhuongTien: undefined,
      capPhuongTien: undefined,
      congDung: undefined,
      namDong: undefined,
      noiDong: undefined,
      chieuDaiThietKe: undefined,
      chieuDaiLonNhat: undefined,
      chieuRongThietKe: undefined,
      chieuRongLonNhat: undefined,
      chieuCaoMan: undefined,
      chieuChim: undefined,
      mucNuocToiDa: undefined,
      manKho: undefined,
      vatLieuVo: undefined,
      soMay: undefined,
      soLuongMay: undefined,
      kieuPhuongTien: undefined,
      dungTichToanPhan: undefined,
      dungTichThucDung: undefined,
      trongTai: undefined,
      mayChinhHieuMay: undefined,
      congSuatMayChinh: undefined,
      cangDangKy: undefined,
      ngayDangKy: undefined,
      coQuanDangKiem: undefined,
      giayCNDangKyTauBienSo: undefined,
      ngayCapGCNDKTauBien: undefined,
      noiCapCNDangKyTau: undefined,
      ghiChu: undefined,
    },
    soTietKiem: {
      kyHan: undefined,
      soTienGui: undefined,
      soTienGiaoDich: undefined,
      soDu: undefined,
      loaiTien: undefined,
      loaiTienGui: undefined,
      laiSuat: undefined,
      soSo: undefined,
      soTaiKhoan: undefined,
      nganHang: undefined,
      ngayPhatHanh: undefined,
      ngayDenHan: undefined,
      hoTen: undefined,
      maKhachHang: undefined,
      diaChi: undefined,
      loaiGiayTo: undefined,
      ngayCapGiayTo: undefined,
      soGiayTo: undefined,
      noiCapGiayTo: undefined,
      ghiChu: undefined,
    },
    tauCa: {
      tenTau: undefined,
      soDangKy: undefined,
      chuPhuongTien: undefined,
      noiThuongTru: undefined,
      coQuanDangKy: undefined,
      loaiTau: undefined,
      congDung: undefined,
      namDong: undefined,
      noiDong: undefined,
      mauThietKe: undefined,
      coQuanThietKe: undefined,
      chieuDaiThietKe: undefined,
      chieuDaiLonNhat: undefined,
      chieuRongThietKe: undefined,
      chieuRongLonNhat: undefined,
      chieuCaoMan: undefined,
      chieuChim: undefined,
      manKho: undefined,
      vatLieuVo: undefined,
      tongDungTich: undefined,
      sucChoToiDa: undefined,
      tocDoTuDo: undefined,
      mayChinhKyHieu: undefined,
      soMay: undefined,
      congSuatMayChinh: undefined,
      noiCheTao: undefined,
      cangDangKy: undefined,
      ngayDangKy: undefined,
      coQuanDangKiem: undefined,
      giayCNDangKyTauBienSo: undefined,
      ngayCapGCNDKTauBien: undefined,
      noiCapCNDangKyTau: undefined,
      ghiChu: undefined,
    },
    xeMay: {
      bienKiemSoat: undefined,
      nhanHieu: undefined,
      loaiXe: undefined,
      mauSon: undefined,
      soMay: undefined,
      soKhung: undefined,
      soLoai: undefined,
      dungTich: undefined,
      giayDangKyXeSo: undefined,
      ngayCap: undefined,
      noiCap: undefined,
      ghiChu: undefined
    }
  };

  soHuuTheo: any = {
    tenGoiKhac: undefined,
    soGiayDat: undefined,
    phanNoiTiep: undefined,
    ngayCapGiayDat: undefined,
    noiCapGiayDat: undefined,
    thongTinThayDoi: undefined
  }

  DanhMucLoaiGiayTo: any[] = [
    { value: 'cmnd', label: 'Chứng minh nhân dân'},
    { value: 'cccd', label: 'Căn cước công dân'},
    { value: 'cc', label: 'Căn cước'},
    { value: 'hc', label: 'Hộ chiếu'},
    { value: 'k', label: 'Giấy tờ hợp lệ khác'}
  ];

  DanhMucLoaiTaiSan: IDanhMucLoaiTaiSan[] = [
    {idLoaiTs: 1, dienGiai: 'Đất không có tài sản gắn liền'},
    {idLoaiTs: 2, dienGiai: 'Ô tô'},
    {idLoaiTs: 3, dienGiai: 'Xe máy'},
    {idLoaiTs: 4, dienGiai: 'Đất có tài sản gắn liền (Nhà, Công trình trên đất v.v...)'},
    {idLoaiTs: 5, dienGiai: 'Phương tiện thuỷ nội địa'},
    {idLoaiTs: 6, dienGiai: 'Sổ tiết kiệm'},
    {idLoaiTs: 7, dienGiai: 'Giấy chứng nhận quyền sở hữu nhà ở'},
    {idLoaiTs: 8, dienGiai: 'Tàu cá'},
  ];

  tinhs: IDanhMucTinh[] = [];
  huyens: IDanhMucHuyen[] = [];
  xas: IDanhMucXa[] = [];
  selectedtinhId: string | null = null;
  selectedhuyenId: string | null = null;
  selectedxaId: string | null = null;
  xaPhuong: string | null = null;
  quanHuyen: string | null = null;
  tinhThanhPho: string | null = null;

  DanhMucSoHuu: any[] = [
    { value: 1, label: 'Giấy CN QSH nhà ở & QSD đất ở'},
    { value: 2, label: 'Giấy CN QSD đất'},
    { value: 3, label: 'Giấy CN SH khác'},
    { value: 4, label: 'Giấy CN QSD đất, QSH nhà ở và tài sản gắn liền với đất'},
    { value: 5, label: 'Giấy CN QSD, QSH tài sản gắn liền với đất'},
  ];


  constructor(private taiSanService: TaiSanService,
              private danhMucTinhService: DanhMucTinhService,
              private danhMucHuyenService: DanhMucHuyenService,
              private danhMucXaService: DanhMucXaService,
              private thongTinCapNhat: ThongTinCapNhatTaiSanService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.loadtinhs();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.newItem.ngayThaoTac = dayjs();
    this.generateThongTinTaiSan(this.newItem);
    const newTaiSan = this.createTaiSan(this.newItem);
    if (this.isEditing) {
      this.updateTaiSan();
    } else {
      this.saveTaiSan(newTaiSan);
    }
  }

  createTaiSan(taisan: ITaiSan): NewTaiSan {
    return {
      ...taisan,
      idTaiSan: null,
      thongTinTs: taisan.thongTinTs
    };
  }

  saveTaiSan(newTaiSan: NewTaiSan): void {
    this.taiSanService.create(newTaiSan).subscribe({
      next: (response) => {
        console.log('Tạo tài sản thành công', response);
        this.notification.success('Thành công', 'Tạo tài sản thành công');

        this.isVisible = false;
        this.dataUpdated.emit();
      },
      error: (err) => {
        console.error('Lỗi khi tạo tài sản:', err);
        this.notification.error('Thất bại', 'Lỗi khi tạo tài sản');
      }
    });
  }

  updateTaiSan(): void {
    if (this.newItem.idTaiSan !== null || this.newItem.idTaiSan !== 0) {
      this.taiSanService.update(this.newItem).subscribe({
        next: (response) => {
          console.log('Cập nhật tài sản thành công', response);
          this.notification.success('Thành công', 'Cập nhật tài sản thành công');

          const thongTinCapNhat: NewThongTinCapNhatTaiSan = {
            idCapNhat: null,
            tenTaiSan: this.newItem.tenTaiSan,
            thongTinTaiSan: this.newItem.thongTinTs,
            ngayCapNhat: dayjs(),
            danhMucLoaiTaiSan: this.newItem.danhMucLoaiTaiSan,
            taiSan: { idTaiSan: this.newItem.idTaiSan }
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
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật tài sản', err);
          this.notification.error('Thất bại', 'Lỗi khi cập nhật tài sản');
        }
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  onLoaiTaiSanChange(selectedLoaiTaiSan: number): void {
    const loaiTaiSan = this.DanhMucLoaiTaiSan.find(loai => loai.idLoaiTs === selectedLoaiTaiSan);

    if (loaiTaiSan) {
      this.newItem.danhMucLoaiTaiSan = {
        idLoaiTs: loaiTaiSan.idLoaiTs,
        dienGiai: loaiTaiSan.dienGiai
      } as IDanhMucLoaiTaiSan;
    } else {
      this.newItem.danhMucLoaiTaiSan = null;
    }
  }

  generateThongTinTaiSan(newItem: ITaiSan): void {
    const idLoaiTs = newItem.danhMucLoaiTaiSan?.idLoaiTs;

    const generateLandInfo = (data: any): string =>
      `<b>Địa chỉ thửa đất: </b>${this.thongTinTaiSan.diaChiThuaDat || ''}<br/>
   <b>Diện tích: </b>${this.thongTinTaiSan.dienTich || ''}<br/>
   <b>Thửa đất số: </b>${this.thongTinTaiSan.thuaDatSo || ''}<br/>
   <b>Tờ bản đồ số: </b>${this.thongTinTaiSan.toBanDoSo || ''}<br/>
   <b>Hạng đất: </b>${this.thongTinTaiSan.hangDat || ''}<br/>
   <b>Mục đích sử dụng: </b>${data.mucDichSD || ''}<br/>
   <b>Thời hạn sử dụng: </b>${data.thoiHanSD || ''}<br/>
   <b>Hình thức sử dụng: </b>${data.hinhThucSD || ''}<br/>
   <b>Nguồn gốc sử dụng: </b>${data.nguonGocSD || ''}<br/>
   <b>Sở hữu theo: </b>${this.thongTinTaiSan.soHuuTheo || ''}<br/>
   <b>Giấy đất số: </b>${this.soHuuTheo.soGiayDat || ''}<br/>
   <b>Phần nối tiếp: </b>${this.soHuuTheo.phanNoiTiep || ''}<br/>
   <b>Ngày cấp giấy đất: </b>${dayjs(this.soHuuTheo.ngayCapGiayDat).format("DD/MM/YYYY") || ''}<br/>
   <b>Nơi cấp giấy đất: </b>${this.soHuuTheo.noiCapGiayDat || ''}<br/>
   <b>Thông tin thay đổi: </b>${this.soHuuTheo.thongTinThayDoi || ''}`;

    const generateCarInfo = (data: any): string =>
      `<b>Biển kiểm soát: </b>${data.bienKiemSoat || ''}<br/>
    <b>Nhãn hiệu: </b>${data.nhanHieu || ''}<br/>
    <b>Loại xe: </b>${data.loaiXe || ''}<br/>
    <b>Màu sơn: </b>${data.mauSon || ''}<br/>
    <b>Số máy: </b>${data.soMay || ''}<br/>
    <b>Số khung: </b>${data.soKhung || ''}<br/>
    <b>Số chỗ ngồi: </b>${data.soChoNgoi || ''}<br/>
    <b>Giấy đăng ký xe số: </b>${data.giayDangKyXeSo || ''}<br/>
    <b>Ngày cấp: </b>${dayjs(data.ngayCap).format("DD/MM/YYYY") || ''}<br/>
    <b>Nơi cấp: </b>${data.noiCap || ''}<br/>`;

    const generateMotorcycleInfo = (data: any): string =>
      `<b>Biển kiểm soát: </b>${data.bienKiemSoat || ''}<br/>
   <b>Nhãn hiệu: </b>${data.nhanHieu || ''}<br/>
   <b>Loại xe: </b>${data.loaiXe || ''}<br/>
   <b>Màu sơn: </b>${data.mauSon || ''}<br/>
   <b>Số máy: </b>${data.soMay || ''}<br/>
   <b>Số khung: </b>${data.soKhung || ''}<br/>
   <b>Số loại: </b>${data.soLoai || ''}<br/>
   <b>Dung tích: </b>${data.dungTich || ''}<br/>
   <b>Giấy đăng ký xe số: </b>${data.giayDangKyXeSo || ''}<br/>
   <b>Ngày cấp: </b>${dayjs(data.ngayCap).format("DD/MM/YYYY") || ''}<br/>
   <b>Nơi cấp: </b>${data.noiCap || ''}`;

    const generateBuildingInfo = (data: any): string =>
      `<b>Thửa đất số: </b>${this.thongTinTaiSan.thuaDatSo || ''}<br/>
   <b>Tờ bản đồ số: </b>${this.thongTinTaiSan.toBanDoSo || ''}<br/>
   <b>Địa chỉ thửa đất: </b>${this.thongTinTaiSan.diaChiThuaDat || ''}<br/>
   <b>Loại công trình: </b>${data.loaiCongTrinh || ''}<br/>
   <b>Tổng diện tích sử dụng: </b>${this.thongTinTaiSan.dienTich || ''}<br/>
   <b>Hạng đất: </b>${this.thongTinTaiSan.hangDat || ''}<br/>
   <b>Hình thức sử dụng: </b>${data.hinhThucSD || ''}<br/>
   <b>Mục đích sử dụng: </b>${data.mucDichSD || ''}<br/>
   <b>Thời hạn sử dụng: </b>${data.thoiHanSD || ''}<br/>
   <b>Thời hạn SD còn lại: </b>${data.thoiHanSDConLai || ''}<br/>
   <b>Nguồn gốc thửa đất: </b>${data.nguonGocThuaDat || ''}<br/>
   <b>Loại nhà ở: </b>${data.loaiNhaO || ''}<br/>
   <b>Địa chỉ nhà: </b>${data.diaChiNha || ''}<br/>
   <b>Diện tích xây dựng: </b>${data.dienTichXayDung || ''}<br/>
   <b>Diện tích sàn: </b>${data.dienTichSan || ''}<br/>
   <b>Cấp nhà: </b>${data.capNha || ''}<br/>
   <b>Số tầng: </b>${data.soTang || ''}<br/>
   <b>Kết cấu: </b>${data.ketCau || ''}<br/>
   <b>Hình thức sở hữu: </b>${data.hinhThucSoHuu || ''}<br/>
   <b>Năm hoàn thành XD: </b>${data.namHoanThanhXayDung || ''}<br/>
   <b>Sở hữu theo: </b>${this.thongTinTaiSan.soHuuTheo || ''}<br/>
   <b>Giấy đất số: </b>${this.soHuuTheo.soGiayDat || ''}<br/>
   <b>Phần nối tiếp: </b>${this.soHuuTheo.phanNoiTiep || ''}<br/>
   <b>Ngày cấp giấy đất: </b>${dayjs(this.soHuuTheo.ngayCapGiayDat).format("DD/MM/YYYY") || ''}<br/>
   <b>Nơi cấp giấy đất: </b>${this.soHuuTheo.noiCapGiayDat || ''}<br/>
   <b>Thông tin thay đổi: </b>${this.soHuuTheo.thongTinThayDoi || ''}`;

    const generateBoatInfo = (data: any): string =>
      `<b>Tên phương tiện: </b>${data.tenPhuongTien || ''}<br/>
   <b>Số đăng ký: </b>${data.soDangKy || ''}<br/>
   <b>Loại phương tiện: </b>${data.loaiPhuongTien || ''}<br/>
   <b>Chủ phương tiện: </b>${data.chuPhuongTien || ''}<br/>
   <b>Địa chỉ chủ phương tiện: </b>${data.diaChiChuPhuongTien || ''}<br/>
   <b>Cấp phương tiện: </b>${data.capPhuongTien || ''}<br/>
   <b>Công dụng: </b>${data.congDung || ''}<br/>
   <b>Năm đóng: </b>${data.namDong || ''}<br/>
   <b>Nơi đóng: </b>${data.noiDong || ''}<br/>
   <b>Chiều dài thiết kế (m): </b>${data.chieuDaiThietKe || ''}<br/>
   <b>Chiều dài lớn nhất (m): </b>${data.chieuDaiLonNhat || ''}<br/>
   <b>Chiều rộng thiết kế (m): </b>${data.chieuRongThietKe || ''}<br/>
   <b>Chiều rộng lớn nhất (m): </b>${data.chieuRongLonNhat || ''}<br/>
   <b>Chiều cao mạn: </b>${data.chieuCaoMan || ''}<br/>
   <b>Chiều chìm: </b>${data.chieuChim || ''}<br/>
   <b>Mức nước tối đa: </b>${data.mucNuocToiDa || ''}<br/>
   <b>Mạn khô: </b>${data.manKho || ''}<br/>
   <b>Vật liệu vỏ: </b>${data.vatLieuVo || ''}<br/>
   <b>Số máy: </b>${data.soMay || ''}<br/>
   <b>Số lượng máy: </b>${data.soLuongMay || ''}<br/>
   <b>Kiểu phương tiện: </b>${data.kieuPhuongTien || ''}<br/>
   <b>Dung tích toàn phần: </b>${data.dungTichToanPhan || ''}<br/>
   <b>Dung tích thực dụng: </b>${data.dungTichThucDung || ''}<br/>
   <b>Trọng tải: </b>${data.trongTai || ''}<br/>
   <b>Máy chính: Hiệu máy: </b>${data.mayChinhHieuMay || ''}<br/>
   <b>Công suất máy chính: </b>${data.congSuatMayChinh || ''}<br/>
   <b>Cảng đăng ký: </b>${data.cangDangKy || ''}<br/>
   <b>Ngày đăng ký: </b>${data.ngayDangKy || ''}<br/>
   <b>Cơ quan đăng kiểm: </b>${data.coQuanDangKiem || ''}<br/>
   <b>Giấy CN đăng ký tàu biển số: </b>${data.giayCNDangKyTauBienSo || ''}<br/>
   <b>Ngày cấp GCNĐK tàu biển: </b>${data.ngayCapGCNDKTauBien || ''}<br/>
   <b>Nơi cấp CN đăng ký tàu: </b>${data.noiCapCNDangKyTau || ''}`;

    const generateBankAccountInfo = (data: any): string =>
      `<b>Kỳ hạn: </b>${data.kyHan || ''}<br/>
   <b>Số tiền gửi: </b>${data.soTienGui || ''}<br/>
   <b>Số tiền giao dịch: </b>${data.soTienGiaoDich || ''}<br/>
   <b>Số dư: </b>${data.soDu || ''}<br/>
   <b>Loại tiền: </b>${data.loaiTien || ''}<br/>
   <b>Loại tiền gửi: </b>${data.loaiTienGui || ''}<br/>
   <b>Lãi suất: </b>${data.laiSuat || ''}<br/>
   <b>Số sổ: </b>${data.soSo || ''}<br/>
   <b>Số tài khoản: </b>${data.soTaiKhoan || ''}<br/>
   <b>Ngân hàng: </b>${data.nganHang || ''}<br/>
   <b>Ngày phát hành: </b>${dayjs(data.ngayPhatHanh).format("DD/MM/YYYY") || ''}<br/>
   <b>Ngày đến hạn: </b>${dayjs(data.ngayDenHan).format("DD/MM/YYYY") || ''}<br/>
   <b>Họ tên: </b>${data.hoTen || ''}<br/>
   <b>Mã khách hàng: </b>${data.maKhachHang || ''}<br/>
   <b>Địa chỉ: </b>${data.diaChi || ''}<br/>
   <b>Giấy tờ tùy thân: </b>${data.loaiGiayTo || ''}<br/>
   <b>Số giấy tờ: </b>${data.soGiayTo || ''}<br/>
   <b>Ngày cấp giấy tờ tùy thân: </b>${dayjs(data.ngayCapGiayTo).format("DD/MM/YYYY") || ''}<br/>
   <b>Nơi cấp giấy tờ tùy thân: </b>${data.noiCapGiayTo || ''}<br/>`;

    const generateHouseInfo = (data: any): string =>
      `<b>Địa chỉ nhà: </b>${data.diaChiNha || ''}<br/>
    <b>Tổng diện tích sử dụng: </b>${this.thongTinTaiSan.dienTich || ''}<br/>
    <b>Diện tích sàn: </b>${data.dienTichSan || ''}<br/>
    <b>Kết cấu: </b>${data.ketCau || ''}<br/>
    <b>Số tầng: </b>${data.soTang || ''}<br/>
    <b>Thửa đất số: </b>${this.thongTinTaiSan.thuaDatSo || ''}<br/>
    <b>Tờ bản đồ số: </b>${this.thongTinTaiSan.toBanDoSo || ''}<br/>
    <b>Loại đất: </b>${data.loaiDat || ''}<br/>
    <b>Hạng đất: </b>${this.thongTinTaiSan.hangDat || ''}<br/>
    <b>Thời hạn sử dụng: </b>${data.thoiHanSD || ''}<br/>
    <b>Hình thức sử dụng (Chung): </b>${data.hinhThucSuDungChung || ''}<br/>
    <b>Hình thức sử dụng (Riêng): </b>${data.hinhThucSuDungRieng || ''}<br/>
    <b>Mục đích sử dụng đất: </b>${data.mucDichSuDungDat || ''}<br/>
    <b>Nguồn gốc thửa đất: </b>${data.nguonGocThuaDat || ''}<br/>
    <b>Sở hữu theo: </b>${data.soHuuTheo || ''}<br/>
    <b>Giấy đất số: </b>${data.soGiayDat || ''}<br/>
    <b>Phần nối tiếp: </b>${data.phanNoiTiep || ''}<br/>
    <b>Ngày cấp giấy đất: </b>${dayjs(data.ngayCapGiayDat).format("DD/MM/YYYY") || ''}<br/>
    <b>Nơi cấp giấy đất: </b>${data.noiCapGiayDat || ''}<br/>
    <b>Thông tin thay đổi: </b>${data.thongTinThayDoi || ''}`;

    const generateFishingBoatInfo = (data: any): string =>
      `<b>Tên tàu: </b>${data.tenTau || ''}<br/>
    <b>Số đăng ký: </b>${data.soDangKy || ''}<br/>
    <b>Chủ phương tiện: </b>${data.chuPhuongTien || ''}<br/>
    <b>Nơi thường trú: </b>${data.noiThuongTru || ''}<br/>
    <b>Cơ quan đăng ký: </b>${data.coQuanDangKy || ''}<br/>
    <b>Loại tàu: </b>${data.loaiTau || ''}<br/>
    <b>Công dụng: </b>${data.congDung || ''}<br/>
    <b>Năm đóng: </b>${data.namDong || ''}<br/>
    <b>Nơi đóng: </b>${data.noiDong || ''}<br/>
    <b>Mẫu thiết kế: </b>${data.mauThietKe || ''}<br/>
    <b>Cơ quan thiết kế: </b>${data.coQuanThietKe || ''}<br/>
    <b>Chiều dài thiết kế (m): </b>${data.chieuDaiThietKe || ''}<br/>
    <b>Chiều dài lớn nhất (m): </b>${data.chieuDaiLonNhat || ''}<br/>
    <b>Chiều rộng thiết kế (m): </b>${data.chieuRongThietKe || ''}<br/>
    <b>Chiều rộng lớn nhất (m): </b>${data.chieuRongLonNhat || ''}<br/>
    <b>Chiều cao mạn: </b>${data.chieuCaoMan || ''}<br/>
    <b>Chiều chìm: </b>${data.chieuChim || ''}<br/>
    <b>Mạn khô: </b>${data.manKho || ''}<br/>
    <b>Vật liệu vỏ: </b>${data.vatLieuVo || ''}<br/>
    <b>Tổng dung tích: </b>${data.tongDungTich || ''}<br/>
    <b>Sức chở tối đa, tấn: </b>${data.sucChoToiDa || ''}<br/>
    <b>Tốc độ tự do, hải lý/h: </b>${data.tocDoTuDo || ''}<br/>
    <b>Máy chính: Ký hiệu: </b>${data.mayChinhKyHieu || ''}<br/>
    <b>Số máy: </b>${data.soMay || ''}<br/>
    <b>Công suất máy chính: </b>${data.congSuatMayChinh || ''}<br/>
    <b>Nơi chế tạo: </b>${data.noiCheTao || ''}<br/>
    <b>Cảng đăng ký: </b>${data.cangDangKy || ''}<br/>
    <b>Ngày đăng ký: </b>${dayjs(data.ngayDangKy).format("DD/MM/YYYY") || ''}<br/>
    <b>Cơ quan đăng kiểm: </b>${data.coQuanDangKiem || ''}<br/>
    <b>Giấy CN đăng ký tàu biển số: </b>${data.giayCNDangKyTauBienSo || ''}<br/>
    <b>Ngày cấp GCNĐK tàu biển: </b>${dayjs(data.ngayCapGCNDKTauBien).format("DD/MM/YYYY") || ''}<br/>
    <b>Nơi cấp CN đăng ký tàu: </b>${data.noiCapCNDangKyTau || ''}`;

    let thongTinTS = '';

    if (idLoaiTs === 1) {
      thongTinTS = generateLandInfo(this.thongTinTaiSan.datKhongCoTaiSanGanLien);
    } else if (idLoaiTs === 2) {
      thongTinTS = generateCarInfo(this.thongTinTaiSan.oTo);
    } else if (idLoaiTs === 3) {
      thongTinTS = generateMotorcycleInfo(this.thongTinTaiSan.xeMay);
    } else if (idLoaiTs === 4) {
      thongTinTS = generateBuildingInfo(this.thongTinTaiSan.datCoTaiSanGanLien);
    } else if (idLoaiTs === 5) {
      thongTinTS = generateBoatInfo(this.thongTinTaiSan.phuongTienThuyNoiDia);
    } else if (idLoaiTs === 6) {
      thongTinTS = generateBankAccountInfo(this.thongTinTaiSan.soTietKiem);
    } else if (idLoaiTs === 7) {
      thongTinTS = generateHouseInfo(this.thongTinTaiSan.giayChungNhanQuyenSoHuuNhaO);
    } else if (idLoaiTs === 8) {
      thongTinTS = generateFishingBoatInfo(this.thongTinTaiSan.tauCa);
    }

    this.newItem.thongTinTs = thongTinTS;
  }

  loadItemData(item: ITaiSan): void {
    const thongTin = this.parseThongTinTs(item.thongTinTs || '');
    console.log('Thông tin:', thongTin);
    console.log('Loading item data:', item);
    this.newItem = {...item};
    const idLoaiTs = this.newItem.danhMucLoaiTaiSan?.idLoaiTs;
    this.thongTinTaiSan = thongTin;
    const soHuuTheo = thongTin.soHuuTheo;
    const selectedItem = this.DanhMucSoHuu.find(item => item.label === soHuuTheo);
    this.selectedSoHuuTheo = selectedItem ? selectedItem.value : null;
    this.soHuuTheo = {
      tenGoiKhac: thongTin.tenGoiKhac || undefined,
      soGiayDat: thongTin.soGiayDat || undefined,
      phanNoiTiep: thongTin.phanNoiTiep || undefined,
      ngayCapGiayDat: thongTin.ngayCapGiayDat ? dayjs(thongTin.ngayCapGiayDat).toDate() : undefined,
      noiCapGiayDat: thongTin.noiCapGiayDat || undefined,
      thongTinThayDoi: thongTin.thongTinThayDoi || undefined,
    };
    const loaiGiayTo = thongTin.loaiGiayTo;
    const selectedGiayTo = this.DanhMucLoaiGiayTo.find(option => option.label === loaiGiayTo);
    this.selectedLoaiGiayTo = selectedGiayTo ? selectedGiayTo.value : null;
    this.extractAddressParts();

    this.selectedtinhId = this.tinhs.find(t => t.tenTinh === this.tinhThanhPho)?.maTinh || null;

    if (this.selectedtinhId) {
      this.ontinhChange(this.selectedtinhId)
        .then(() => {
          this.selectedhuyenId = this.huyens.find(h => h.tenHuyen === this.quanHuyen)?.maHuyen || null;
          if (this.selectedhuyenId) {
            return this.onhuyenChange(this.selectedhuyenId);
          }
          return Promise.resolve();
        })
        .then(() => {
          this.selectedxaId = this.xas.find(x => x.tenXa === this.xaPhuong)?.maXa || null;
          this.generateAddress();
        })
        .catch(() => {
        });
    } else {
    }

    if (idLoaiTs === 1) {
      this.thongTinTaiSan.datKhongCoTaiSanGanLien = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 2) {
      this.thongTinTaiSan.oTo = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 3) {
      this.thongTinTaiSan.xeMay = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 4) {
      this.thongTinTaiSan.datCoTaiSanGanLien = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 5) {
      this.thongTinTaiSan.phuongTienThuyNoiDia = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 6) {
      this.thongTinTaiSan.soTietKiem = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 7) {
      this.thongTinTaiSan.giayChungNhanQuyenSoHuuNhaO = this.parseThongTinTs(item.thongTinTs || '');
    } else if (idLoaiTs === 8) {
      this.thongTinTaiSan.tauCa = this.parseThongTinTs(item.thongTinTs || '');
    }
  }

  onLoaiGiayToChange(value: string): void {
    this.isGiayToKhacVisible = (value === 'k');

    const loaiGiayTo = this.DanhMucLoaiGiayTo.find(option => option.value === value);

    if (loaiGiayTo) {
      this.thongTinTaiSan.soTietKiem = {
        loaiGiayTo: loaiGiayTo.label
      };
    } else {
      this.thongTinTaiSan.soTietKiem = null;
    }
  }

  parseThongTinTs(thongTinTs: string): any {
    const parser = new DOMParser();
    const doc = parser.parseFromString(thongTinTs, 'text/html');

    const getValue = (label: string): string => {
      const element = Array.from(doc.querySelectorAll('b')).find(b => b.textContent?.includes(label));
      return element ? element.nextSibling?.textContent?.trim() || '' : '';
    };

    const parseDate = (dateStr: string): Date | null => {
      const parsedDate = dayjs(dateStr, 'DD/MM/YYYY', true);
      return parsedDate.isValid() ? parsedDate.toDate() : null;
    };

    return {
      diaChiThuaDat: getValue('Địa chỉ thửa đất:'),
      dienTich: getValue('Diện tích:') || getValue('Tổng diện tích sử dụng:'),
      thuaDatSo: getValue('Thửa đất số:'),
      toBanDoSo: getValue('Tờ bản đồ số:'),
      mucDichSD: getValue('Mục đích sử dụng:'),
      thoiHanSD: getValue('Thời hạn sử dụng:'),
      hinhThucSD: getValue('Hình thức sử dụng:'),
      nguonGocSD: getValue('Nguồn gốc sử dụng:'),
      soHuuTheo: getValue('Sở hữu theo:'),
      soGiayDat: getValue('Giấy đất số:'),
      phanNoiTiep: getValue('Phần nối tiếp:'),
      ngayCapGiayDat: parseDate(getValue('Ngày cấp giấy đất:')),
      noiCapGiayDat: getValue('Nơi cấp giấy đất:'),
      thongTinThayDoi: getValue('Thông tin thay đổi:'),

      bienKiemSoat: getValue('Biển kiểm soát:'),
      nhanHieu: getValue('Nhãn hiệu:'),
      loaiXe: getValue('Loại xe:'),
      mauSon: getValue('Màu sơn:'),
      soMay: getValue('Số máy:'),
      soKhung: getValue('Số khung:'),
      soChoNgoi: getValue('Số chỗ ngồi:'),
      giayDangKyXeSo: getValue('Giấy đăng ký xe số:'),
      ngayCap: parseDate(getValue('Ngày cấp:')),
      noiCap: getValue('Nơi cấp:'),

      soLoai: getValue('Số loại:'),
      dungTich: getValue('Dung tích:'),

      tenPhuongTien: getValue('Tên phương tiện:'),
      soDangKy: getValue('Số đăng ký:'),
      loaiPhuongTien: getValue('Loại phương tiện:'),
      chuPhuongTien: getValue('Chủ phương tiện:'),
      diaChiChuPhuongTien: getValue('Địa chỉ chủ phương tiện:'),
      capPhuongTien: getValue('Cấp phương tiện:'),
      congDung: getValue('Công dụng:'),
      namDong: getValue('Năm đóng:'),
      noiDong: getValue('Nơi đóng:'),
      chieuDaiThietKe: getValue('Chiều dài thiết kế (m):'),
      chieuDaiLonNhat: getValue('Chiều dài lớn nhất (m):'),
      chieuRongThietKe: getValue('Chiều rộng thiết kế (m):'),
      chieuRongLonNhat: getValue('Chiều rộng lớn nhất (m):'),
      chieuCaoMan: getValue('Chiều cao mạn:'),
      chieuChim: getValue('Chiều chìm:'),
      mucNuocToiDa: getValue('Mức nước tối đa:'),
      manKho: getValue('Mạn khô:'),
      vatLieuVo: getValue('Vật liệu vỏ:'),
      soLuongMay: getValue('Số lượng máy:'),
      kieuPhuongTien: getValue('Kiểu phương tiện:'),
      dungTichToanPhan: getValue('Dung tích toàn phần:'),
      dungTichThucDung: getValue('Dung tích thực dụng:'),
      trongTai: getValue('Trọng tải:'),
      mayChinhHieuMay: getValue('Máy chính: Hiệu máy:'),
      tenTau: getValue('Tên tàu:'),
      noiThuongTru: getValue('Nơi thường trú:'),
      loaiTau: getValue("Loại tàu:"),
      coQuanDangKy: getValue('Cơ quan đăng ký:'),
      mauThietKe: getValue('Mẫu thiết kế:'),
      coQuanThietKe: getValue('Cơ quan thiết kế:'),
      tongDungTich: getValue('Tổng dung tích:'),
      sucChoToiDa: getValue('Sức chở tối đa, tấn:'),
      tocDoTuDo: getValue('Tốc độ tự do, hải lý/h:'),
      mayChinhKyHieu: getValue('Máy chính: Ký hiệu:'),
      congSuatMayChinh: getValue('Công suất máy chính:'),
      noiCheTao: getValue('Nơi chế tạo:'),
      cangDangKy: getValue('Cảng đăng ký:'),
      ngayDangKy: parseDate(getValue('Ngày đăng ký:')),
      coQuanDangKiem: getValue('Cơ quan đăng kiểm:'),
      giayCNDangKyTauBienSo: getValue('Giấy CN đăng ký tàu biển số:'),
      ngayCapGCNDKTauBien: parseDate(getValue('Ngày cấp GCNĐK tàu biển:')),
      noiCapCNDangKyTau: getValue('Nơi cấp CN đăng ký tàu:'),

      loaiCongTrinh: getValue('Loại công trình:'),
      hangDat: getValue('Hạng đất:'),
      diaChiNha: getValue('Địa chỉ nhà:'),
      dienTichXayDung: getValue('Diện tích xây dựng:'),
      dienTichSan: getValue('Diện tích sàn:'),
      capNha: getValue('Cấp nhà:'),
      soTang: getValue('Số tầng:'),
      ketCau: getValue('Kết cấu:'),
      hinhThucSoHuu: getValue('Hình thức sở hữu:'),
      namHoanThanhXayDung: getValue('Năm hoàn thành XD:'),
      thoiHanSDConLai: getValue('Thời hạn SD còn lại:'),
      nguonGocThuaDat: getValue('Nguồn gốc thửa đất:'),
      loaiNhaO: getValue('Loại nhà ở:'),

      kyHan: getValue('Kỳ hạn:'),
      soTienGui: getValue('Số tiền gửi:'),
      soTienGiaoDich: getValue('Số tiền giao dịch:'),
      soDu: getValue('Số dư:'),
      loaiTien: getValue('Loại tiền:'),
      loaiTienGui: getValue('Loại tiền gửi:'),
      laiSuat: getValue('Lãi suất:'),
      soSo: getValue('Số sổ:'),
      soTaiKhoan: getValue('Số tài khoản:'),
      nganHang: getValue('Ngân hàng:'),
      ngayPhatHanh: parseDate(getValue('Ngày phát hành:')),
      ngayDenHan: parseDate(getValue('Ngày đến hạn:')),
      hoTen: getValue('Họ tên:'),
      maKhachHang: getValue('Mã khách hàng:'),
      diaChi: getValue('Địa chỉ:'),
      loaiGiayTo: getValue('Giấy tờ tùy thân:'),
      soGiayTo: getValue('Số giấy tờ:'),
      ngayCapGiayTo: parseDate(getValue('Ngày cấp giấy tờ tùy thân:')),
      noiCapGiayTo: getValue('Nơi cấp giấy tờ tùy thân:')
    };
  }

  onDiaChiThuaDatChange(): void {
    setTimeout(() => {
      this.generateTenPhieu();
    }, 0);
  }

  generateTenPhieu(): void {
    const currentTenPhieu = this.newItem.tenTaiSan || '';

    const {
      thuaDatSo = '',
      toBanDoSo = '',
      dienTich = '',
      diaChiThuaDat = '',
    } = this.thongTinTaiSan;

    const {
      bienKiemSoat: bienKiemSoatXeMay = '',
      soKhung: soKhungXeMay = '',
      loaiXe: loaiXeMay = '',
    } = this.thongTinTaiSan.xeMay || {};

    const {
      bienKiemSoat: bienKiemSoatOTo = '',
      soKhung: soKhungOTo = '',
      loaiXe: loaiXeOTo = '',
    } = this.thongTinTaiSan.oTo || {};

    const {
      loaiPhuongTien: loaiPhuongTien = '',
      soDangKy: soDangKyPhuongTien = '',
      ngayDangKy: ngayDangKyPhuongTien = '',
    } = this.thongTinTaiSan.phuongTienThuyNoiDia || {};

    const {
      loaiTau: loaiTau = '',
      soDangKy: soDangKyTau = '',
      ngayDangKy: ngayDangKyTauCa = '',
    } = this.thongTinTaiSan.tauCa || {};

    const {
      soSo: soSo = '',
      nganHang: nganHang = '',
      ngayPhatHanh: ngayPhatHanh = ''
    } = this.thongTinTaiSan.soTietKiem || {};
    const regex = /(\d+m²\s*\(\w*\))|(\s+xã\s+\w+)|(\s+huyện\s+\w+)|(\s+tỉnh\s+\w+)|(\s+thửa:\s+\d+)|(\s+số tờ bản đồ:\s+\d+)/g;
    const existingParts = currentTenPhieu.match(regex) || [];

    const updatedDienTich = existingParts.find((part: string) => part.includes('m²')) || `${dienTich}m²`;
    const existingTenNguoi = currentTenPhieu.match(/\(([^)]+)\)/);
    const nameInBrackets = existingTenNguoi ? existingTenNguoi[0] : '(Nhập tên)';

    const extraInfoMatch = currentTenPhieu.match(/\)\s*([^,]+),/);
    const extraInfo = extraInfoMatch ? extraInfoMatch[1] : '; đất';

    const formattedNgayDangKyPhuongTien = ngayDangKyPhuongTien ? dayjs(ngayDangKyPhuongTien).format('DD/MM/YYYY') : '';
    const formattedNgayDangKyTauCa = ngayDangKyTauCa ? dayjs(ngayDangKyTauCa).format('DD/MM/YYYY') : '';
    const formattedNgayPhatHanh = ngayPhatHanh ? dayjs(ngayPhatHanh).format('DD/MM/YYYY') : '';
    if (this.newItem.danhMucLoaiTaiSan?.idLoaiTs === 3) {
      this.newItem.tenTaiSan = `Xe ${loaiXeMay} ${nameInBrackets} ${bienKiemSoatXeMay}, số khung ${soKhungXeMay}`;
    } else if (this.newItem.danhMucLoaiTaiSan?.idLoaiTs === 2) {
      this.newItem.tenTaiSan = `Xe ${loaiXeOTo} ${nameInBrackets} ${bienKiemSoatOTo}, số khung ${soKhungOTo}`;
    } else if (this.newItem.danhMucLoaiTaiSan?.idLoaiTs === 5) {
      this.newItem.tenTaiSan = `${loaiPhuongTien} ${nameInBrackets}, ${soDangKyPhuongTien} cấp ngày ${formattedNgayDangKyPhuongTien}`;
    } else if (this.newItem.danhMucLoaiTaiSan?.idLoaiTs === 6) {
      this.newItem.tenTaiSan = `Sổ tiết kiệm ${nameInBrackets}, số ${soSo} ${nganHang} ${formattedNgayPhatHanh}`;
    } else if (this.newItem.danhMucLoaiTaiSan?.idLoaiTs === 8) {
      this.newItem.tenTaiSan = `${loaiTau} ${nameInBrackets}, ${soDangKyTau} cấp ngày ${formattedNgayDangKyTauCa}`;
    } else {
      this.newItem.tenTaiSan = `${updatedDienTich || ''} ${nameInBrackets || ''}${extraInfo}, ${diaChiThuaDat}, thửa: ${thuaDatSo || ''}, số tờ bản đồ: ${toBanDoSo || ''}, diện tích: ${dienTich || ''}m²`;
    }
  }

  generateAddress(): void {
    const selectedTinh = this.tinhs.find(tinh => tinh.maTinh === this.selectedtinhId);
    const selectedHuyen = this.huyens.find(huyen => huyen.maHuyen === this.selectedhuyenId);
    const selectedXa = this.xas.find(xa => xa.maXa === this.selectedxaId);

    const tinhThanh = selectedTinh ? selectedTinh.tenTinh : '';
    const quanHuyen = selectedHuyen ? selectedHuyen.tenHuyen : '';
    const phuongXa = selectedXa ? selectedXa.tenXa : '';

    this.thongTinTaiSan.diaChiThuaDat = `${phuongXa}, ${quanHuyen}, ${tinhThanh}`;
    this.generateTenPhieu();
  }

  filterOption(input: string, option: any): boolean {
    return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
  }

  loadtinhs(): void {
    this.danhMucTinhService.query().subscribe({
      next: (res) => {
        this.tinhs = res.body || [];
      },
      error: (err) => console.error('Error fetching tinhs', err),
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

  onSoHuuTheoChange(value: number): void {
    this.selectedSoHuuTheo = value;

    const soHuuTheo = this.DanhMucSoHuu.find(option => option.value === value);
    if (soHuuTheo) {
      this.thongTinTaiSan.soHuuTheo = soHuuTheo.label;
    } else {
      this.thongTinTaiSan.soHuuTheo = null;
    }
  }

  extractAddressParts(): void {
    if (this.thongTinTaiSan.diaChiThuaDat) {
      const addressParts = this.thongTinTaiSan.diaChiThuaDat.split(',').map((part: string) => part.trim());
      if (addressParts.length === 3) {
        this.xaPhuong = addressParts[0];
        this.quanHuyen = addressParts[1];
        this.tinhThanhPho = addressParts[2];
      }
    } else {
      this.xaPhuong = null;
      this.quanHuyen = null;
      this.tinhThanhPho = null;
    }
  }

  resetForm(): void {
    this.selectedtinhId = null;
    this.selectedhuyenId = null;
    this.selectedxaId = null;
    this.selectedSoHuuTheo = null;
    this.selectedLoaiTaiSan = null;
    this.selectedLoaiGiayTo = null;

    this.newItem = {
      danhMucLoaiTaiSan: undefined,
      ghiChu: undefined,
      idDonVi: undefined,
      idDuongSu: undefined,
      idLoaiNganChan: undefined,
      idMaster: undefined,
      idTaiSan: 0,
      idTsGoc: undefined,
      loaiNganChan: undefined,
      maTaiSan: undefined,
      moTa: undefined,
      ngayBdNganChan: undefined,
      ngayKtNganChan: undefined,
      ngayThaoTac: undefined,
      nguoiThaoTac: undefined,
      soCc: undefined,
      soHsCv: undefined,
      soVaoSo: undefined,
      strSearch: undefined,
      syncStatus: undefined,
      tenTaiSan: undefined,
      thongTinTs: undefined,
      tinhTrangTaiSan: undefined,
      trangThai: undefined
    };

    this.thongTinTaiSan = {
      diaChiThuaDat: undefined,
      thuaDatSo: undefined,
      toBanDoSo: undefined,
      dienTich: undefined,
      soHuuTheo: undefined,
      hangDat: undefined,
      datCoTaiSanGanLien: {
        loaiCongTrinh: undefined,
        tongDienTichSD: undefined,
        hinhThucSD: undefined,
        mucDichSD: undefined,
        thoiHanSD: undefined,
        thoiHanSDConLai: undefined,
        nguonGocThuaDat: undefined,
        loaiNhaO: undefined,
        diaChiNha: undefined,
        dienTichXayDung: undefined,
        dienTichSan: undefined,
        capNha: undefined,
        soTang: undefined,
        ketCau: undefined,
        namHoanThanhXayDung: undefined,
      },
      datKhongCoTaiSanGanLien: {
        mucDichSD: undefined,
        thoiHanSD: undefined,
        hinhThucSD: undefined,
        nguonGocSD: undefined,
        ghiChu: undefined,
      },
      giayChungNhanQuyenSoHuuNhaO: {
        diaChi: undefined,
        tongDienTichSuDung: undefined,
        dienTichSan: undefined,
        ketCau: undefined,
        soTang: undefined,
        loaiDat: undefined,
        thoiHanSD: undefined,
        hinhThucSuDungChung: undefined,
        hinhThucSuDungRieng: undefined,
        mucDichSuDungDat: undefined,
        nguonGocThuaDat: undefined,
        ghiChu: undefined,
      },
      oTo: {
        bienKiemSoat: undefined,
        nhanHieu: undefined,
        loaiXe: undefined,
        mauSon: undefined,
        soMay: undefined,
        soKhung: undefined,
        soChoNgoi: undefined,
        giayDangKyXeSo: undefined,
        ngayCap: undefined,
        noiCap: undefined,
        ghiChu: undefined
      },
      phuongTienThuyNoiDia: {
        tenPhuongTien: undefined,
        soDangKy: undefined,
        loaiPhuongTien: undefined,
        chuPhuongTien: undefined,
        diaChiChuPhuongTien: undefined,
        capPhuongTien: undefined,
        congDung: undefined,
        namDong: undefined,
        noiDong: undefined,
        chieuDaiThietKe: undefined,
        chieuDaiLonNhat: undefined,
        chieuRongThietKe: undefined,
        chieuRongLonNhat: undefined,
        chieuCaoMan: undefined,
        chieuChim: undefined,
        mucNuocToiDa: undefined,
        manKho: undefined,
        vatLieuVo: undefined,
        soMay: undefined,
        soLuongMay: undefined,
        kieuPhuongTien: undefined,
        dungTichToanPhan: undefined,
        dungTichThucDung: undefined,
        trongTai: undefined,
        mayChinhHieuMay: undefined,
        congSuatMayChinh: undefined,
        cangDangKy: undefined,
        ngayDangKy: undefined,
        coQuanDangKiem: undefined,
        giayCNDangKyTauBienSo: undefined,
        ngayCapGCNDKTauBien: undefined,
        noiCapCNDangKyTau: undefined,
        ghiChu: undefined,
      },
      soTietKiem: {
        kyHan: undefined,
        soTienGui: undefined,
        soTienGiaoDich: undefined,
        soDu: undefined,
        loaiTien: undefined,
        loaiTienGui: undefined,
        laiSuat: undefined,
        soSo: undefined,
        soTaiKhoan: undefined,
        nganHang: undefined,
        ngayPhatHanh: undefined,
        ngayDenHan: undefined,
        hoTen: undefined,
        maKhachHang: undefined,
        diaChi: undefined,
        giayToTuyThan: undefined,
        soGiayTo: undefined,
        ngayCapGiayTo: undefined,
        ghiChu: undefined,
      },
      tauCa: {
        tenTau: undefined,
        soDangKy: undefined,
        chuPhuongTien: undefined,
        noiThuongTru: undefined,
        coQuanDangKy: undefined,
        loaiTau: undefined,
        congDung: undefined,
        namDong: undefined,
        noiDong: undefined,
        mauThietKe: undefined,
        coQuanThietKe: undefined,
        chieuDaiThietKe: undefined,
        chieuDaiLonNhat: undefined,
        chieuRongThietKe: undefined,
        chieuRongLonNhat: undefined,
        chieuCaoMan: undefined,
        chieuChim: undefined,
        manKho: undefined,
        vatLieuVo: undefined,
        tongDungTich: undefined,
        sucChoToiDa: undefined,
        tocDoTuDo: undefined,
        mayChinhKyHieu: undefined,
        soMay: undefined,
        congSuatMayChinh: undefined,
        noiCheTao: undefined,
        cangDangKy: undefined,
        ngayDangKy: undefined,
        coQuanDangKiem: undefined,
        giayCNDangKyTauBienSo: undefined,
        ngayCapGCNDKTauBien: undefined,
        noiCapCNDangKyTau: undefined,
        ghiChu: undefined,
      },
      xeMay: {
        bienKiemSoat: undefined,
        nhanHieu: undefined,
        loaiXe: undefined,
        mauSon: undefined,
        soMay: undefined,
        soKhung: undefined,
        soLoai: undefined,
        dungTich: undefined,
        giayDangKyXeSo: undefined,
        ngayCap: undefined,
        noiCap: undefined,
        ghiChu: undefined
      }
    };

    this.soHuuTheo = {
      tenGoiKhac: undefined,
      soGiayDat: undefined,
      phanNoiTiep: undefined,
      ngayCapGiayDat: undefined,
      noiCapGiayDat: undefined,
      thongTinThayDoi: undefined
    };
  }
}
