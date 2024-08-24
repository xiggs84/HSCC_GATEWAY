import dayjs from 'dayjs/esm';

import { IDonViScanQr, NewDonViScanQr } from './don-vi-scan-qr.model';

export const sampleWithRequiredData: IDonViScanQr = {
  id: 13123,
};

export const sampleWithPartialData: IDonViScanQr = {
  id: 1241,
  idDonVi: 14543,
  idCongDan: 19960,
};

export const sampleWithFullData: IDonViScanQr = {
  id: 7728,
  idLuotQuet: 18316,
  idDonVi: 20219,
  idCongDan: 27079,
  ngayThaoTac: dayjs('2024-08-19'),
};

export const sampleWithNewData: NewDonViScanQr = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
