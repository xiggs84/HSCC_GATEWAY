export interface ICanBoQuyen {
  id: number;
  idCanBo?: number | null;
  idQuyen?: number | null;
  idDonVi?: number | null;
}

export type NewCanBoQuyen = Omit<ICanBoQuyen, 'id'> & { id: null };
