export interface IPhanLoaiHopDong {
  idPhanLoaiHopDong: string;
  dienGiai?: string | null;
}

export type NewPhanLoaiHopDong = Omit<IPhanLoaiHopDong, 'idPhanLoaiHopDong'> & { idPhanLoaiHopDong: null };
