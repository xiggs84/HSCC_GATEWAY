import dayjs from 'dayjs/esm';

import { IDanhMucCanBo, NewDanhMucCanBo } from './danh-muc-can-bo.model';

export const sampleWithRequiredData: IDanhMucCanBo = {
  idCanBo: 6142,
};

export const sampleWithPartialData: IDanhMucCanBo = {
  idCanBo: 14232,
  diaChi: 'towards below',
  namSinh: dayjs('2024-08-20'),
  soDienThoai: 'aw what gah',
  idDonVi: 13911,
  tenDangNhap: 'lap',
  matKhau: 'during so almost',
  clientId: 'hateful',
};

export const sampleWithFullData: IDanhMucCanBo = {
  idCanBo: 13529,
  tenCanBo: 'forenenst contort drat',
  diaChi: 'accurate sultan',
  namSinh: dayjs('2024-08-19'),
  email: 'Tuan7kuc50@gmail.com',
  soDienThoai: 'kilometer where',
  soGiayToTuyThan: 'duh',
  idDonVi: 8016,
  tenDangNhap: 'cheerfully belfry bow',
  matKhau: 'thankfully keenly luxurious',
  trangThai: 7921,
  clientId: 'which noisily',
  clientSecret: 'indeed',
  usernameKyso: 'psst ugh',
  passwordKyso: 'jealously',
  userLogin: 'ugh',
};

export const sampleWithNewData: NewDanhMucCanBo = {
  idCanBo: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
