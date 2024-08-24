import dayjs from 'dayjs/esm';

export interface ISoCongChungTemp {
  id: number;
  idHopDong?: number | null;
  idMaster?: number | null;
  soCc?: string | null;
  ngayThaoTac?: dayjs.Dayjs | null;
}

export type NewSoCongChungTemp = Omit<ISoCongChungTemp, 'id'> & { id: null };
