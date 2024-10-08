import { ITaiSan } from 'app/entities/tai-san/tai-san.model';

export interface IThuaTach {
  idThuaTach: number;
  thongTinThuaTach?: string | null;
  trangThai?: number | null;
  taiSan?: Pick<ITaiSan, 'idTaiSan'> | null;
}

export type NewThuaTach = Omit<IThuaTach, 'idThuaTach'> & { idThuaTach: null };
