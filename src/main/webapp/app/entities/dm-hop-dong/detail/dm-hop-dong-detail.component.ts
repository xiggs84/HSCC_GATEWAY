import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IDmHopDong } from '../dm-hop-dong.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-hop-dong-detail',
  templateUrl: './dm-hop-dong-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmHopDongDetailComponent {
  dmHopDong = input<IDmHopDong | null>(null);

  previousState(): void {
    window.history.back();
  }
}
