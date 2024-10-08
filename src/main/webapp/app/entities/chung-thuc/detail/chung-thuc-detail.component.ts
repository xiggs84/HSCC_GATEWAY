import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IChungThuc } from '../chung-thuc.model';

@Component({
  standalone: true,
  selector: 'jhi-chung-thuc-detail',
  templateUrl: './chung-thuc-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ChungThucDetailComponent {
  chungThuc = input<IChungThuc | null>(null);

  previousState(): void {
    window.history.back();
  }
}
