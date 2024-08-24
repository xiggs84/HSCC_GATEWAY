import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDmXaTmp } from '../dm-xa-tmp.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-xa-tmp-detail',
  templateUrl: './dm-xa-tmp-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmXaTmpDetailComponent {
  dmXaTmp = input<IDmXaTmp | null>(null);

  previousState(): void {
    window.history.back();
  }
}
