import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDuongSuTrungCmndBak } from '../duong-su-trung-cmnd-bak.model';
import { DuongSuTrungCmndBakService } from '../service/duong-su-trung-cmnd-bak.service';

@Component({
  standalone: true,
  templateUrl: './duong-su-trung-cmnd-bak-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DuongSuTrungCmndBakDeleteDialogComponent {
  duongSuTrungCmndBak?: IDuongSuTrungCmndBak;

  protected duongSuTrungCmndBakService = inject(DuongSuTrungCmndBakService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.duongSuTrungCmndBakService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
