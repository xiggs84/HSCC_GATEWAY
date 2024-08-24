import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmXaTmp } from '../dm-xa-tmp.model';
import { DmXaTmpService } from '../service/dm-xa-tmp.service';

@Component({
  standalone: true,
  templateUrl: './dm-xa-tmp-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmXaTmpDeleteDialogComponent {
  dmXaTmp?: IDmXaTmp;

  protected dmXaTmpService = inject(DmXaTmpService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmXaTmpService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
