import { IDanhMucLoaiHopDong } from 'app/entities/danh-muc-loai-hop-dong/danh-muc-loai-hop-dong.model';

export interface IDanhMucVaiTro {
  idVaiTro: string;
  dienGiai?: string | null;
  idLoaiVaiTro?: number | null;
  danhMucLoaiHopDong?: Pick<IDanhMucLoaiHopDong, 'idLoaiHd'> | null;
}

export type NewDanhMucVaiTro = Omit<IDanhMucVaiTro, 'idVaiTro'> & { idVaiTro: string | null };
