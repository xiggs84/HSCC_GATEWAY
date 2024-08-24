import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';

@Component({
  standalone: true,
  selector: 'jhi-duong-su-trung-cmnd-bak-detail',
  templateUrl: './duong-su-trung-cmnd-bak-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DuongSuTrungCmndBakDetailComponent {
  duongSuTrungCmndBak = input<IDuongSuTrungCmndBak | null>(null);

  previousState(): void {
    window.history.back();
  }
}
