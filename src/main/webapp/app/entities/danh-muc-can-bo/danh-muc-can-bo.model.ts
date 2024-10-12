import dayjs from 'dayjs/esm';

export interface IDanhMucCanBo {
  idCanBo: number;
  tenCanBo?: string | null;
  diaChi?: string | null;
  namSinh?: dayjs.Dayjs | null;
  email?: string | null;
  soDienThoai?: string | null;
  soGiayToTuyThan?: string | null;
  idDonVi?: number | null;
  tenDangNhap?: string | null;
  matKhau?: string | null;
  trangThai?: number | null;
  clientId?: string | null;
  clientSecret?: string | null;
  usernameKyso?: string | null;
  passwordKyso?: string | null;
  userLogin?: string | null;
}

export type NewDanhMucCanBo = Omit<IDanhMucCanBo, 'idCanBo'> & { idCanBo: null };
