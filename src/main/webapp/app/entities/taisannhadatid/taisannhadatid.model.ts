export interface ITaisannhadatid {
  idTaiSan: number;
  thongTinTs?: string | null;
}

export type NewTaisannhadatid = Omit<ITaisannhadatid, 'idTaiSan'> & { idTaiSan: null };
