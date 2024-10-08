import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ISoCongChungTemp } from '../so-cong-chung-temp.model';

@Component({
  standalone: true,
  selector: 'jhi-so-cong-chung-temp-detail',
  templateUrl: './so-cong-chung-temp-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SoCongChungTempDetailComponent {
  soCongChungTemp = input<ISoCongChungTemp | null>(null);

  previousState(): void {
    window.history.back();
  }
}
