import dayjs from 'dayjs/esm';

import { IThongTinCapNhatTaiSan, NewThongTinCapNhatTaiSan } from './thong-tin-cap-nhat-tai-san.model';

export const sampleWithRequiredData: IThongTinCapNhatTaiSan = {
  idCapNhat: 21986,
};

export const sampleWithPartialData: IThongTinCapNhatTaiSan = {
  idCapNhat: 1658,
  tenTaiSan: 'meh from',
  thongTinTaiSan: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IThongTinCapNhatTaiSan = {
  idCapNhat: 29817,
  tenTaiSan: 'into',
  thongTinTaiSan: '../fake-data/blob/hipster.txt',
  ngayCapNhat: dayjs('2024-09-27'),
};

export const sampleWithNewData: NewThongTinCapNhatTaiSan = {
  idCapNhat: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
