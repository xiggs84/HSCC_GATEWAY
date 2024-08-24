import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDanhSachChungThuc } from '../danh-sach-chung-thuc.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-sach-chung-thuc-detail',
  templateUrl: './danh-sach-chung-thuc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhSachChungThucDetailComponent {
  danhSachChungThuc = input<IDanhSachChungThuc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
