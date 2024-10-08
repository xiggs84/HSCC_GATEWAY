import { IDanhSachHopDong } from 'app/entities/danh-sach-hop-dong/danh-sach-hop-dong.model';

export interface IDanhMucLoaiVanBan {
  idLoaiVb: string;
  dienGiai?: string | null;
  danhSachHopDong?: Pick<IDanhSachHopDong, 'idHopDong'> | null;
}

export type NewDanhMucLoaiVanBan = Omit<IDanhMucLoaiVanBan, 'idLoaiVb'> & { idLoaiVb: string | null };

