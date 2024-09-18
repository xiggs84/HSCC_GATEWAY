import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IDmDuongSu } from '../dm-duong-su.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-duong-su-detail',
  templateUrl: './dm-duong-su-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmDuongSuDetailComponent {
  dmDuongSu = input<IDmDuongSu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
