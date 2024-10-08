import dayjs from 'dayjs/esm';
import { ITaiSan } from 'app/entities/tai-san/tai-san.model';
import { IDanhMucLoaiTaiSan } from 'app/entities/danh-muc-loai-tai-san/danh-muc-loai-tai-san.model';

export interface IThongTinCapNhatTaiSan {
  idCapNhat: number;
  tenTaiSan?: string | null;
  thongTinTaiSan?: string | null;
  ngayCapNhat?: dayjs.Dayjs | null;
  taiSan?: Pick<ITaiSan, 'idTaiSan'> | null;
  danhMucLoaiTaiSan?: Pick<IDanhMucLoaiTaiSan, 'idLoaiTs'> | null;
}

export type NewThongTinCapNhatTaiSan = Omit<IThongTinCapNhatTaiSan, 'idCapNhat'> & { idCapNhat: null };
