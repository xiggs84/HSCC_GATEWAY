import { IPhanLoaiHopDong, NewPhanLoaiHopDong } from './phan-loai-hop-dong.model';

export const sampleWithRequiredData: IPhanLoaiHopDong = {
  idPhanLoaiHopDong: '40e8dd00-c6e5-4b7c-af26-985cffae5b84',
};

export const sampleWithPartialData: IPhanLoaiHopDong = {
  idPhanLoaiHopDong: '5786bbab-3d1a-4e28-8603-7a335a20ec7e',
  dienGiai: 'hare',
};

export const sampleWithFullData: IPhanLoaiHopDong = {
  idPhanLoaiHopDong: '51e25a26-449c-4713-ab35-0672d0f445a5',
  dienGiai: 'flawless',
};

export const sampleWithNewData: NewPhanLoaiHopDong = {
  idPhanLoaiHopDong: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
