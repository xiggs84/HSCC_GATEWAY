import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDmHuyenTmp } from '../dm-huyen-tmp.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-huyen-tmp-detail',
  templateUrl: './dm-huyen-tmp-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmHuyenTmpDetailComponent {
  dmHuyenTmp = input<IDmHuyenTmp | null>(null);

  previousState(): void {
    window.history.back();
  }
}
