import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmHuyenTmp } from '../dm-huyen-tmp.model';
import { DmHuyenTmpService } from '../service/dm-huyen-tmp.service';

@Component({
  standalone: true,
  templateUrl: './dm-huyen-tmp-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmHuyenTmpDeleteDialogComponent {
  dmHuyenTmp?: IDmHuyenTmp;

  protected dmHuyenTmpService = inject(DmHuyenTmpService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmHuyenTmpService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
