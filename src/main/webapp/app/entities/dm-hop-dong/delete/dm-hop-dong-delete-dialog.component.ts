import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDmHopDong } from '../dm-hop-dong.model';
import { DmHopDongService } from '../service/dm-hop-dong.service';

@Component({
  standalone: true,
  templateUrl: './dm-hop-dong-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DmHopDongDeleteDialogComponent {
  dmHopDong?: IDmHopDong;

  protected dmHopDongService = inject(DmHopDongService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.dmHopDongService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
