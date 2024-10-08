import dayjs from 'dayjs/esm';

import { IDmLoaiHd, NewDmLoaiHd } from './dm-loai-hd.model';

export const sampleWithRequiredData: IDmLoaiHd = {
  idLoaiHd: '32457395-59ad-4856-a8ac-a5a1737cdb74',
};

export const sampleWithPartialData: IDmLoaiHd = {
  idLoaiHd: '5e4f2864-02ac-44ea-bdf1-0a3c74169f0b',
  dienGiai: 'eradicate nutty curry',
  idVaiTro2: 9098,
  fileHopDong: 'bulky astrolabe who',
  dieuKhoan: 'amid whoever noted',
  idDonVi: 9860,
  trangThai: 11446,
  srcLoiChung: 'as ugh',
  chuyenTaiSan: 21081,
  loaiHuyBo: 6498,
  srcTb: 'partially though',
  srcTtpc: 'mushy',
  nhomTen: 2130,
  idVaiTro3: 11189,
};

export const sampleWithFullData: IDmLoaiHd = {
  idLoaiHd: '07189067-e91a-49a6-adfe-e7bb4e8d7e70',
  dienGiai: 'powerless infantile adolescent',
  idVaiTro1: 3583,
  idVaiTro2: 30181,
  fileHopDong: 'creamy quicker grotesque',
  srcHopDong: 'apud exhort',
  dieuKhoan: 'morning hm',
  idDonVi: 14814,
  trangThai: 29736,
  ngayThaoTac: dayjs('2024-08-20'),
  nguoiThaoTac: 19780,
  srcLoiChung: 'portly duh foolishly',
  fileLoiChung: 'for',
  chuyenTaiSan: 16351,
  loaiSuaDoi: 3859,
  loaiHuyBo: 8710,
  trangThaiDuyet: 15534,
  idPhanLoaiHopDong: 31836,
  srcCv: 'continually',
  srcTb: 'walk',
  srcTtpc: 'queasily',
  dgTen: 'forsaken',
  nhomTen: 30722,
  idVaiTro3: 26235,
};

export const sampleWithNewData: NewDmLoaiHd = {
  idLoaiHd: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
