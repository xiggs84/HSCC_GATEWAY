import { ILoaiHopDongCongChung, NewLoaiHopDongCongChung } from './loai-hop-dong-cong-chung.model';

export const sampleWithRequiredData: ILoaiHopDongCongChung = {
  idLoaiHopDongCongChung: 'af9ec492-30f6-4e38-959c-d9603eecd260',
};

export const sampleWithPartialData: ILoaiHopDongCongChung = {
  idLoaiHopDongCongChung: '45e5c975-cb5f-4693-8976-2398d5048ecd',
  giaTri: 25996,
  trangThai: 11174,
};

export const sampleWithFullData: ILoaiHopDongCongChung = {
  idLoaiHopDongCongChung: '2693e4bd-96db-4c35-bbe0-2b456aab2a9f',
  dienGiai: 'idolise however prostanoid',
  giaTri: 19404,
  trangThai: 10026,
};

export const sampleWithNewData: NewLoaiHopDongCongChung = {
  idLoaiHopDongCongChung: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
