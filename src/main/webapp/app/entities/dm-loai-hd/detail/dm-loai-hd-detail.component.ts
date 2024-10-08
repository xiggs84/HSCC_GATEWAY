import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IDmLoaiHd } from '../dm-loai-hd.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-loai-hd-detail',
  templateUrl: './dm-loai-hd-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmLoaiHdDetailComponent {
  dmLoaiHd = input<IDmLoaiHd | null>(null);

  previousState(): void {
    window.history.back();
  }
}
