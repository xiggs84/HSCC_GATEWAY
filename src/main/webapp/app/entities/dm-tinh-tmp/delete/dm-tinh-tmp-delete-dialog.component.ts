import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmTinhTmp } from '../dm-tinh-tmp.model';
import { DmTinhTmpService } from '../service/dm-tinh-tmp.service';

@Component({
  standalone: true,
  templateUrl: './dm-tinh-tmp-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmTinhTmpDeleteDialogComponent {
  dmTinhTmp?: IDmTinhTmp;

  protected dmTinhTmpService = inject(DmTinhTmpService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmTinhTmpService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
