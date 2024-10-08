import dayjs from 'dayjs/esm';

import { IDuongSuTrungCmndBak, NewDuongSuTrungCmndBak } from './duong-su-trung-cmnd-bak.model';

export const sampleWithRequiredData: IDuongSuTrungCmndBak = {
  id: 26009,
};

export const sampleWithPartialData: IDuongSuTrungCmndBak = {
  id: 14523,
  diaChi: 'psst',
  trangThai: 1,
  nguoiThaoTac: 28982,
  idDsGoc: 30816,
  idMaster: 'lest',
  soGiayTo: 'brave fatally aside',
};

export const sampleWithFullData: IDuongSuTrungCmndBak = {
  id: 19137,
  tenDuongSu: 'until',
  diaChi: 'purple before',
  trangThai: 0,
  thongTinDs: 'gah these uh-huh',
  ngayThaoTac: dayjs('2024-08-19'),
  nguoiThaoTac: 803,
  idDsGoc: 28148,
  idMaster: 'brr nor thermals',
  idDonVi: 24467,
  strSearch: 'placate amongst',
  soGiayTo: 'walnut',
};

export const sampleWithNewData: NewDuongSuTrungCmndBak = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
