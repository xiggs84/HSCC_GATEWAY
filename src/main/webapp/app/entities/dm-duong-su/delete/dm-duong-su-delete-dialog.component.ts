import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmDuongSu } from '../dm-duong-su.model';
import { DmDuongSuService } from '../service/dm-duong-su.service';

@Component({
  standalone: true,
  templateUrl: './dm-duong-su-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmDuongSuDeleteDialogComponent {
  dmDuongSu?: IDmDuongSu;

  protected dmDuongSuService = inject(DmDuongSuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmDuongSuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
