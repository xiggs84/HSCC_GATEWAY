import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IChungThuc } from '../chung-thuc.model';
import { ChungThucService } from '../service/chung-thuc.service';

@Component({
  standalone: true,
  templateUrl: './chung-thuc-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ChungThucDeleteDialogComponent {
  chungThuc?: IChungThuc;

  protected chungThucService = inject(ChungThucService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chungThucService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
