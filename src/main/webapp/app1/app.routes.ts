import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/trangchu' },
  { path: 'trangchu', loadChildren:() => import('./pages/trangchu/trangchu.routes').then(m=>m.TRANGCHU_ROUTES) },
  { path: 'thongkexacthuccccd', loadChildren:()=>import('./pages/thongkexacthuccccd/thongkexacthuccccd.routes').then(m=>m.THONGKEXACTHUCCCCD_ROUTES)},
  { path: 'chonhopdong', loadChildren:() => import('./pages/chonhopdong/chonhopdong.routes').then(m=>m.CHONHOPDONG_ROUTES)},
  { path: 'danhsachhopdong', loadChildren:() => import('./pages/danhsachhopdong/danhsachhopdong.routes').then(m=>m.DANHSACHHOPDONG_ROUTES)}
];
