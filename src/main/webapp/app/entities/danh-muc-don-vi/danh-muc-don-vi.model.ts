import dayjs from 'dayjs/esm';
import { CapQuanLy } from 'app/entities/enumerations/cap-quan-ly.model';
import { NhiemVu } from 'app/entities/enumerations/nhiem-vu.model';
import { LoaiDonVi } from 'app/entities/enumerations/loai-don-vi.model';

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
  capQuanLy?: keyof typeof CapQuanLy | null;
  loaiNhiemVu?: keyof typeof NhiemVu | null;
  hoaDonDt?: number | null;
  maDonViIgate?: string | null;
  maCoQuanIgate?: string | null;
  loaiDonVi?: keyof typeof LoaiDonVi | null;
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
}

export type NewDanhMucDonVi = Omit<IDanhMucDonVi, 'idDonVi'> & { idDonVi: null };
