import dayjs from 'dayjs/esm';

import { IDanhMucCanBo, NewDanhMucCanBo } from './danh-muc-can-bo.model';

export const sampleWithRequiredData: IDanhMucCanBo = {
  id: 21077,
};

export const sampleWithPartialData: IDanhMucCanBo = {
  id: 18352,
  idCanBo: 23468,
  tenCanBo: 'bah',
  diaChi: 'consequently since',
  namSinh: dayjs('2024-08-19'),
  soDienThoai: 'huzzah an',
  soCmnd: 'as peppery yet',
  matKhau: 'bather closely',
  clientId: 'usually group',
  usernameKyso: 'astride',
};

export const sampleWithFullData: IDanhMucCanBo = {
  id: 10917,
  idCanBo: 822,
  tenCanBo: 'oof bah',
  diaChi: 'arrogantly endorsement usually',
  namSinh: dayjs('2024-08-19'),
  email: 'TheHung_Ha84@yahoo.com',
  soDienThoai: 'tiny reproachfully',
  soCmnd: 'footrest',
  idDonVi: 7555,
  tenDangNhap: 'acceptable what cookbook',
  matKhau: 'biopsy ah',
  trangThai: 9670,
  clientId: 'trading steal fiercely',
  clientSecret: 'pin usually',
  usernameKyso: 'bustling round',
  passwordKyso: 'in',
};

export const sampleWithNewData: NewDanhMucCanBo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
