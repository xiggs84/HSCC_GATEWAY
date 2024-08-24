import dayjs from 'dayjs/esm';

export interface IDonViScanQr {
  id: number;
  idLuotQuet?: number | null;
  idDonVi?: number | null;
  idCongDan?: number | null;
  ngayThaoTac?: dayjs.Dayjs | null;
}

export type NewDonViScanQr = Omit<IDonViScanQr, 'id'> & { id: null };
