import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmTaiSan } from '../dm-tai-san.model';
import { DmTaiSanService } from '../service/dm-tai-san.service';

@Component({
  standalone: true,
  templateUrl: './dm-tai-san-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmTaiSanDeleteDialogComponent {
  dmTaiSan?: IDmTaiSan;

  protected dmTaiSanService = inject(DmTaiSanService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dmTaiSanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
