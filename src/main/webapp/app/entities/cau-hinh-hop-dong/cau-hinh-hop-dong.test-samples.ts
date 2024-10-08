import { ICauHinhHopDong, NewCauHinhHopDong } from './cau-hinh-hop-dong.model';

export const sampleWithRequiredData: ICauHinhHopDong = {
  id: 26249,
};

export const sampleWithPartialData: ICauHinhHopDong = {
  id: 23920,
  idLoaiHopDong: 'cactus',
  idDonVi: 22176,
  chieuDai: 19148,
  tienTo: 'blabber',
  giaTri: 13352,
  hienThi: 'naughty chime besides',
};

export const sampleWithFullData: ICauHinhHopDong = {
  id: 25404,
  idLoaiHopDong: 'gadzooks nearly',
  idDonVi: 15693,
  chieuDai: 4520,
  tienTo: 'which because',
  giaTri: 31569,
  hienThi: 'rag presidency',
  trangThai: 9576,
};

export const sampleWithNewData: NewCauHinhHopDong = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
