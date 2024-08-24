import dayjs from 'dayjs/esm';

export interface IDanhMucDonVi {
  id: number;
  idDonVi?: number | null;
  tenDonVi?: string | null;
  diaChi?: string | null;
  nguoiDaiDien?: string | null;
  soDienThoai?: string | null;
  idDonViQl?: number | null;
  loaiDonVi?: number | null;
  ngayKhaiBao?: dayjs.Dayjs | null;
  trangThai?: number | null;
  idTinh?: number | null;
  idHuyen?: number | null;
  idPhuongXa?: number | null;
  soNha?: string | null;
  maSoThue?: string | null;
  idCapQl?: number | null;
  loaiNhiemVu?: number | null;
  hoaDonDt?: number | null;
  maDonViIgate?: string | null;
  maCoQuanIgate?: string | null;
  capDonVi?: number | null;
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

export type NewDanhMucDonVi = Omit<IDanhMucDonVi, 'id'> & { id: null };
