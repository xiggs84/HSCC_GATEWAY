import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDmTaiSan } from '../dm-tai-san.model';

@Component({
  standalone: true,
  selector: 'jhi-dm-tai-san-detail',
  templateUrl: './dm-tai-san-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DmTaiSanDetailComponent {
  dmTaiSan = input<IDmTaiSan | null>(null);

  previousState(): void {
    window.history.back();
  }
}
