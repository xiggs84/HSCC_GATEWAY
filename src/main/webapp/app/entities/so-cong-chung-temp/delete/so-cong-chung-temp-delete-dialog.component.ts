import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISoCongChungTemp } from '../so-cong-chung-temp.model';
import { SoCongChungTempService } from '../service/so-cong-chung-temp.service';

@Component({
  standalone: true,
  templateUrl: './so-cong-chung-temp-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SoCongChungTempDeleteDialogComponent {
  soCongChungTemp?: ISoCongChungTemp;

  protected soCongChungTempService = inject(SoCongChungTempService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.soCongChungTempService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
