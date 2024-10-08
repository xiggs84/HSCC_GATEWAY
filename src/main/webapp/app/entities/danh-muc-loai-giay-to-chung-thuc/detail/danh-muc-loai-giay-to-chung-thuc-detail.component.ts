import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IDanhMucLoaiGiayToChungThuc } from '../danh-muc-loai-giay-to-chung-thuc.model';

@Component({
  standalone: true,
  selector: 'jhi-danh-muc-loai-giay-to-chung-thuc-detail',
  templateUrl: './danh-muc-loai-giay-to-chung-thuc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DanhMucLoaiGiayToChungThucDetailComponent {
  danhMucLoaiGiayToChungThuc = input<IDanhMucLoaiGiayToChungThuc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
