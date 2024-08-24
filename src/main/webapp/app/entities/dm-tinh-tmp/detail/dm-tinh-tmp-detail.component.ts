import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDmTinhTmp } from '../dm-tinh-tmp.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-tinh-tmp-detail',
  templateUrl: './dm-tinh-tmp-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmTinhTmpDetailComponent {
  dmTinhTmp = input<IDmTinhTmp | null>(null);

  previousState(): void {
    window.history.back();
  }
}
