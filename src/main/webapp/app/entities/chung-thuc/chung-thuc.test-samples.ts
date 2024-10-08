import dayjs from 'dayjs/esm';

import { IChungThuc, NewChungThuc } from './chung-thuc.model';

export const sampleWithRequiredData: IChungThuc = {
  idChungThuc: '9fe1ba2b-63b7-4c6b-aa14-831cc2721170',
};

export const sampleWithPartialData: IChungThuc = {
  idChungThuc: '30da848e-8994-4248-8750-6b733e0f10d5',
  ngayChungThuc: dayjs('2024-08-20'),
  ngayThaoTac: dayjs('2024-08-20'),
  soTienThu: 18137,
  soBanSao: 2117,
  quyenSo: 9790,
  taiSan: 'quirkily aha',
  strSearch: 'pointed',
  srcChungThuc: 'wherever refocus',
  thongTinChungThuc: 'busily',
  chucDanhCanBo: 'calculus',
  ldPheDuyet: 9728,
  chucDanhLd: 'unknown',
};

export const sampleWithFullData: IChungThuc = {
  idChungThuc: '89dd6471-196d-4911-82d3-e402d0ef1075',
  idDonVi: 29807,
  nguoiYeuCau: 'option underground satirise',
  nguoiChungThuc: 14034,
  nguoiThaoTac: 3431,
  ngayChungThuc: dayjs('2024-08-20'),
  ngayThaoTac: dayjs('2024-08-19'),
  soTienThu: 21780,
  soBanSao: 789,
  vanBan: 'catacomb mmm when',
  trangThai: 25072,
  quyenSo: 5850,
  duongSu: 'vivacious',
  taiSan: 'correctly toreador',
  strSearch: 'versus constant failing',
  srcChungThuc: 'unto',
  thongTinChungThuc: 'seemingly whereas spat',
  chuKyNgoaiTruSo: 3932,
  idCtGoc: 32457,
  ngayText: 'till off',
  chucDanhCanBo: 'baggy',
  ldPheDuyet: 1350,
  chucDanhLd: 'consult',
};

export const sampleWithNewData: NewChungThuc = {
  idChungThuc: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
