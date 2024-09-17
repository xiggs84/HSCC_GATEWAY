import dayjs from 'dayjs/esm';
import { ICapQuanLy } from 'app/entities/cap-quan-ly/cap-quan-ly.model';
import { ILoaiDonVi } from 'app/entities/loai-don-vi/loai-don-vi.model';
import { INhiemVu } from 'app/entities/nhiem-vu/nhiem-vu.model';

export interface IDanhMucDonVi {
  idDonVi: number;
  tenDonVi?: string | null;
  diaChi?: string | null;
  nguoiDaiDien?: string | null;
  soDienThoai?: string | null;
  idDonViQl?: number | null;
  ngayKhaiBao?: dayjs.Dayjs | null;
  trangThai?: number | null;
  soNha?: string | null;
  maSoThue?: string | null;
  hoaDonDt?: number | null;
  maDonViIgate?: string | null;
  maCoQuanIgate?: string | null;
  kySo?: number | null;
  qrScan?: number | null;
  verifyIdCard?: number | null;
  isVerifyFace?: number | null;
  isElastic?: number | null;
  apikeyCccd?: string | null;
  apikeyFace?: string | null;
  verifyCodeCccd?: string | null;
  usernameElastic?: string | null;
  passwordElastic?: string | null;
  idNhiemVu?: string | null;
  idLoaiDv?: string | null;
  idCapQl?: string | null;
  capQuanLy?: ICapQuanLy | null;
  loaiDonVi?: ILoaiDonVi | null;
  nhiemVu?: INhiemVu | null;
}

export type NewDanhMucDonVi = Omit<IDanhMucDonVi, 'idDonVi'> & { idDonVi: null };
