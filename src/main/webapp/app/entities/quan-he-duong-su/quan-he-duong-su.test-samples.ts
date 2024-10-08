import { IQuanHeDuongSu, NewQuanHeDuongSu } from './quan-he-duong-su.model';

export const sampleWithRequiredData: IQuanHeDuongSu = {
  idQuanHe: 17213,
};

export const sampleWithPartialData: IQuanHeDuongSu = {
  idQuanHe: 17448,
  idDuongSuQh: 24065,
};

export const sampleWithFullData: IQuanHeDuongSu = {
  idQuanHe: 18316,
  idDuongSuQh: 16861,
  thongTinQuanHe: 'yum impassioned',
  trangThai: 1,
};

export const sampleWithNewData: NewQuanHeDuongSu = {
  idQuanHe: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
