import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChonhopdongComponent } from '../chonhopdong/chonhopdong.component'

import {MuabanchuyennhuongComponent} from './muabanchuyennhuong/muabanchuyennhuong.component'

const routes: Routes = [
  { path: 'muabanchuyennhuong', component: MuabanchuyennhuongComponent },
  { path: '', component: ChonhopdongComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
