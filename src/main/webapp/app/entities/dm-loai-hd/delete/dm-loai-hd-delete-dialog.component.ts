import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmLoaiHd } from '../dm-loai-hd.model';
import { DmLoaiHdService } from '../service/dm-loai-hd.service';

@Component({
  standalone: true,
  templateUrl: './dm-loai-hd-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmLoaiHdDeleteDialogComponent {
  dmLoaiHd?: IDmLoaiHd;

  protected dmLoaiHdService = inject(DmLoaiHdService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmLoaiHdService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
