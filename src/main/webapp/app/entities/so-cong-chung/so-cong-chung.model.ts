import dayjs from 'dayjs/esm';
import { IDanhMucLoaiSoCongChung } from 'app/entities/danh-muc-loai-so-cong-chung/danh-muc-loai-so-cong-chung.model';

export interface ISoCongChung {
  idSo: string;
  idDonVi?: number | null;
  tenSo?: string | null;
  giaTri?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
  nguoiThaoTac?: number | null;
  trangThai?: number | null;
  danhMucLoaiSoCongChung?: Pick<IDanhMucLoaiSoCongChung, 'idLoai'> | null;
}

export type NewSoCongChung = Omit<ISoCongChung, 'idSo'> & { idSo: null };
