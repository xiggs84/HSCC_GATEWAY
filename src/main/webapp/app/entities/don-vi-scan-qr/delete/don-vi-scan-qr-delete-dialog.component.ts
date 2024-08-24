import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDonViScanQr } from '../don-vi-scan-qr.model';
import { DonViScanQrService } from '../service/don-vi-scan-qr.service';

@Component({
  standalone: true,
  templateUrl: './don-vi-scan-qr-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DonViScanQrDeleteDialogComponent {
  donViScanQr?: IDonViScanQr;

  protected donViScanQrService = inject(DonViScanQrService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.donViScanQrService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
