import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICauHinhMauChungThuc } from '../cau-hinh-mau-chung-thuc.model';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-chung-thuc-detail',
  templateUrl: './cau-hinh-mau-chung-thuc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CauHinhMauChungThucDetailComponent {
  cauHinhMauChungThuc = input<ICauHinhMauChungThuc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
