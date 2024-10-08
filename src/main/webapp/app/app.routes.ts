import { Routes } from '@angular/router';

import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import LoginComponent from './login/login.component';
import {SidebarComponent} from './layouts/sidebar/sidebar.component'
import {HeaderComponent} from './layouts/header/header.component'
import {TrangchuComponent} from './trangchu/trangchu.component'
import {ChonhopdongComponent} from './pages/chonhopdong/chonhopdong.component'
import {DanhsachhopdongComponent} from './pages/danhsachhopdong/danhsachhopdong.component'
import {ThongkexacthuccccdComponent} from './pages/thongkexacthuccccd/thongkexacthuccccd.component'
import {MuabanchuyennhuongComponent} from './pages/loaihopdong/muabanchuyennhuong/muabanchuyennhuong.component'
import {LoaitaisanComponent} from './danhmuc/loaitaisan/loaitaisan.component'
import {DuongsuComponent} from "./danhmuc/duongsu/duongsu/duongsu.component";
import {DonviComponent} from "./danhmuc/donvi/donvi.component";
import {TaisanComponent} from "./danhmuc/taisan/taisan.component";
import {VaitroComponent} from "./danhmuc/vaitro/vaitro.component";
import {LoaivanbanComponent} from "./danhmuc/loaivanban/loaivanban.component";
import {CanboComponent} from "./danhmuc/canbo/canbo.component";
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home.title',
  },
  {
    path: 'muabanchuyennhuong',
    component: MuabanchuyennhuongComponent,
    title: "",
  },
  {
    path: 'trangchu',
    component: TrangchuComponent,
    title: 'trangchu',
  },
  {
    path: 'chonhopdong',
    component: ChonhopdongComponent,
    title: 'chonhopdong',
  },
  {
    path: 'danhsachhopdong',
    component: DanhsachhopdongComponent,
    title: 'danhsachhopdong',
  },
  {
    path: 'thongkexacthuccccd',
    component: ThongkexacthuccccdComponent,
    title: 'thongkexacthuccccd',
  },
  {
    path: 'loaitaisan',
    component: LoaitaisanComponent,
    title: 'loaitaisan',
  },
  {
    path: 'loaivanban',
    component: LoaivanbanComponent,
    title: 'loaivanban',
  },
  {
    path: 'duongsu',
    component: DuongsuComponent,
    title: 'duongsu',
  },
  {
    path: 'canbo',
    component: CanboComponent,
    title: 'canbo',
  },
  {
    path: 'taisan',
    component: TaisanComponent,
    title: 'taisan',
  },
  {
    path: 'vaitro',
    component: VaitroComponent,
    title: 'vaitro',
  },
  {
    path: 'donvi',
    component: DonviComponent,
    title: 'donvi',
  },
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
  },
  {
    path: '',
    component: HeaderComponent,
    outlet: 'header',
  },
  {
    path: '',
    component: SidebarComponent,
    outlet: 'sidebar',
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [UserRouteAccessService],
    loadChildren: () => import('./admin/admin.routes'),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.route'),
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login.title',
  },
  {
    path: '',
    loadChildren: () => import(`./entities/entity.routes`),
  },
  // {
  //   path: 'taohopdong',
  //   loadChildren: () => import('./pages/loaihopdong/loaihopdong.routes'),
  // },
  ...errorRoute,
];

export default routes;
