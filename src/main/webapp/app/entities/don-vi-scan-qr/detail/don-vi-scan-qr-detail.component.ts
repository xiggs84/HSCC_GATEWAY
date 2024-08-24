import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IDonViScanQr } from '../don-vi-scan-qr.model';

@Component({
  standalone: true,
  selector: 'jhi-don-vi-scan-qr-detail',
  templateUrl: './don-vi-scan-qr-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DonViScanQrDetailComponent {
  donViScanQr = input<IDonViScanQr | null>(null);

  previousState(): void {
    window.history.back();
  }
}
