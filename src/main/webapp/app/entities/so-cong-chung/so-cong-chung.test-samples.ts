import dayjs from 'dayjs/esm';

import { ISoCongChung, NewSoCongChung } from './so-cong-chung.model';

export const sampleWithRequiredData: ISoCongChung = {
  idSo: '322fb81f-1349-4813-b2c6-dad1688f5140',
};

export const sampleWithPartialData: ISoCongChung = {
  idSo: 'c26df82b-4b77-4c49-ab1c-581a662a6246',
  giaTri: 8630,
  ngayThaoTac: dayjs('2024-08-19'),
};

export const sampleWithFullData: ISoCongChung = {
  idSo: '403b3c1f-7c89-4fb8-9b14-12220f5e704b',
  idDonVi: 12399,
  tenSo: 'questioningly among',
  giaTri: 24685,
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 13442,
  trangThai: 3990,
};

export const sampleWithNewData: NewSoCongChung = {
  idSo: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
